import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { prisma } from '../utils/database';
import { createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

interface AuthRequest extends Request {
  user?: any;
}

interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export const uploadFile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const files = req.files as UploadedFile[];
    const orderId = req.body.orderId;

    if (!files || files.length === 0) {
      throw createError('No files uploaded', 400);
    }

    const uploadedFiles = [];

    for (const file of files) {
      // Process image files with Sharp for optimization
      if (file.mimetype.startsWith('image/')) {
        try {
          const optimizedPath = file.path.replace(/\.[^/.]+$/, '-optimized.jpg');
          
          await sharp(file.path)
            .resize(2000, 2000, { 
              fit: 'inside',
              withoutEnlargement: true 
            })
            .jpeg({ quality: 90 })
            .toFile(optimizedPath);

          // Remove original file and use optimized version
          fs.unlinkSync(file.path);
          file.path = optimizedPath;
          file.filename = path.basename(optimizedPath);
          file.mimetype = 'image/jpeg';
        } catch (optimizationError) {
          logger.warn('Image optimization failed, using original:', optimizationError);
        }
      }

      // Save file record to database
      const fileRecord = await prisma.file.create({
        data: {
          userId: req.user.id,
          orderId: orderId || null,
          filename: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          path: file.path,
        },
      });

      uploadedFiles.push(fileRecord);
    }

    logger.info(`Files uploaded: ${uploadedFiles.length} files by user ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Files uploaded successfully',
      data: { files: uploadedFiles },
    });
  } catch (error) {
    // Clean up uploaded files on error
    if (req.files) {
      const files = req.files as UploadedFile[];
      files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    next(error);
  }
};

export const getFiles = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const orderId = req.query.orderId as string;

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = { userId: req.user.id };

    if (orderId) {
      where.orderId = orderId;
    }

    // Get files with pagination
    const [files, total] = await Promise.all([
      prisma.file.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          order: {
            select: {
              id: true,
              orderNumber: true,
              status: true,
            },
          },
        },
      }),
      prisma.file.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        files,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore: page < totalPages,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getFile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const file = await prisma.file.findUnique({
      where: { id },
      include: {
        order: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
          },
        },
      },
    });

    if (!file) {
      throw createError('File not found', 404);
    }

    // Check if user owns this file or is admin
    if (file.userId !== req.user.id && !['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      throw createError('Access denied', 403);
    }

    // Check if file exists on disk
    if (!fs.existsSync(file.path)) {
      throw createError('File not found on disk', 404);
    }

    res.json({
      success: true,
      data: { file },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      throw createError('File not found', 404);
    }

    // Check if user owns this file
    if (file.userId !== req.user.id) {
      throw createError('Access denied', 403);
    }

    // Delete file from database
    await prisma.file.delete({
      where: { id },
    });

    // Delete physical file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    logger.info(`File deleted: ${file.filename} by user ${req.user.email}`);

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};