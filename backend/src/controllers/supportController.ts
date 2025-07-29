import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { prisma } from '../utils/database';
import { createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import { sendEmail } from '../utils/email';

interface AuthRequest extends Request {
  user?: any;
}

// Validation schemas
const contactMessageSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(5).max(200).required(),
  message: Joi.string().min(10).max(2000).required(),
  phone: Joi.string().optional(),
  company: Joi.string().optional(),
});

const supportTicketSchema = Joi.object({
  subject: Joi.string().min(5).max(200).required(),
  message: Joi.string().min(10).max(2000).required(),
  priority: Joi.string().valid('LOW', 'NORMAL', 'HIGH', 'URGENT').default('NORMAL'),
});

const updateTicketSchema = Joi.object({
  status: Joi.string().valid('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED').required(),
  priority: Joi.string().valid('LOW', 'NORMAL', 'HIGH', 'URGENT').optional(),
});

export const createContactMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const { error, value } = contactMessageSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const { name, email, subject, message, phone, company } = value;

    // Send email to support team
    try {
      await sendEmail({
        to: process.env.SUPPORT_EMAIL || process.env.FROM_EMAIL!,
        subject: `New Contact Message: ${subject}`,
        template: 'contactMessage',
        data: {
          name,
          email,
          subject,
          message,
          phone,
          company,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (emailError) {
      logger.error('Failed to send contact message email:', emailError);
      // Don't fail the request if email fails
    }

    logger.info(`Contact message received from ${email}: ${subject}`);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
    });
  } catch (error) {
    next(error);
  }
};

export const createSupportTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const { error, value } = supportTicketSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const { subject, message, priority } = value;

    const ticket = await prisma.supportTicket.create({
      data: {
        userId: req.user.id,
        subject,
        message,
        priority,
      },
    });

    // Send notification email to support team
    try {
      await sendEmail({
        to: process.env.SUPPORT_EMAIL || process.env.FROM_EMAIL!,
        subject: `New Support Ticket #${ticket.id}: ${subject}`,
        template: 'newSupportTicket',
        data: {
          ticketId: ticket.id,
          subject,
          message,
          priority,
          userEmail: req.user.email,
          userName: `${req.user.firstName} ${req.user.lastName}`,
          timestamp: ticket.createdAt.toISOString(),
        },
      });
    } catch (emailError) {
      logger.error('Failed to send support ticket notification:', emailError);
    }

    logger.info(`Support ticket created: #${ticket.id} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Support ticket created successfully',
      data: { ticket },
    });
  } catch (error) {
    next(error);
  }
};

export const getSupportTickets = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = { userId: req.user.id };

    if (status) {
      where.status = status;
    }

    // Get tickets with pagination
    const [tickets, total] = await Promise.all([
      prisma.supportTicket.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.supportTicket.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        tickets,
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

export const getSupportTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const ticket = await prisma.supportTicket.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!ticket) {
      throw createError('Support ticket not found', 404);
    }

    // Check if user owns this ticket or is admin
    if (ticket.userId !== req.user.id && !['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      throw createError('Access denied', 403);
    }

    res.json({
      success: true,
      data: { ticket },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSupportTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const priority = req.query.priority as string;
    const search = req.query.search as string;

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (search) {
      where.OR = [
        { subject: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { user: { firstName: { contains: search, mode: 'insensitive' } } },
        { user: { lastName: { contains: search, mode: 'insensitive' } } },
      ];
    }

    // Get tickets with pagination
    const [tickets, total] = await Promise.all([
      prisma.supportTicket.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' },
        ],
      }),
      prisma.supportTicket.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        tickets,
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

export const updateSupportTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate input
    const { error, value } = updateTicketSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const { status, priority } = value;

    const ticket = await prisma.supportTicket.update({
      where: { id },
      data: {
        status,
        ...(priority && { priority }),
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    logger.info(`Support ticket updated: #${ticket.id} to ${status} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Support ticket updated successfully',
      data: { ticket },
    });
  } catch (error) {
    next(error);
  }
};