import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../utils/database';
import { createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import { sendEmail } from '../utils/email';

interface AuthRequest extends Request {
  user?: any;
}

// Validation schemas
const createOrderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().positive().required(),
      material: Joi.string().required(),
      finish: Joi.string().optional(),
      dimensions: Joi.string().optional(),
      customSpecs: Joi.object().optional(),
    })
  ).min(1).required(),
  notes: Joi.string().optional(),
  shippingAddress: Joi.string().optional(),
});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid(
    'PENDING',
    'CONFIRMED', 
    'IN_DESIGN',
    'IN_PRODUCTION',
    'QUALITY_CHECK',
    'SHIPPED',
    'DELIVERED',
    'COMPLETED',
    'CANCELLED'
  ).required(),
  notes: Joi.string().optional(),
});

// Generate order number
const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}${random}`;
};

export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const { items, notes, shippingAddress } = value;

    // Calculate total amount
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw createError(`Product ${item.productId} not found`, 404);
      }

      if (!product.isActive) {
        throw createError(`Product ${product.name} is not available`, 400);
      }

      // Calculate pricing (simplified - you could use the pricing logic from productController)
      const unitPrice = product.basePrice;
      const totalPrice = unitPrice * item.quantity;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice,
        totalPrice,
        material: item.material,
        finish: item.finish,
        dimensions: item.dimensions,
        customSpecs: item.customSpecs || {},
      });

      totalAmount += totalPrice;
    }

    // Check wallet balance
    const wallet = await prisma.wallet.findUnique({
      where: { userId: req.user.id },
    });

    if (!wallet || wallet.balance < totalAmount) {
      throw createError('Insufficient wallet balance', 400);
    }

    // Create order in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create order
      const order = await tx.order.create({
        data: {
          userId: req.user.id,
          orderNumber: generateOrderNumber(),
          totalAmount,
          notes,
          shippingAddress,
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
      });

      // Create order items
      await tx.orderItem.createMany({
        data: orderItems.map(item => ({
          ...item,
          orderId: order.id,
        })),
      });

      // Deduct from wallet
      await tx.wallet.update({
        where: { userId: req.user.id },
        data: { balance: { decrement: totalAmount } },
      });

      // Create transaction record
      await tx.transaction.create({
        data: {
          userId: req.user.id,
          type: 'ORDER_PAYMENT',
          amount: -totalAmount,
          description: `Payment for order ${order.orderNumber}`,
          status: 'COMPLETED',
        },
      });

      return order;
    });

    // Send order confirmation email
    try {
      await sendEmail({
        to: req.user.email,
        subject: 'Order Confirmation - LabelVaults',
        template: 'orderConfirmation',
        data: {
          firstName: req.user.firstName,
          orderNumber: result.orderNumber,
          totalAmount: result.totalAmount.toFixed(2),
          estimatedDelivery: result.estimatedDelivery?.toDateString(),
          trackingUrl: `${process.env.FRONTEND_URL}/orders/${result.id}`,
        },
      });
    } catch (emailError) {
      logger.error('Failed to send order confirmation email:', emailError);
    }

    logger.info(`Order created: ${result.orderNumber} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order: result },
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
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

    // Get orders with pagination
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          orderItems: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        orders,
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

export const getOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        files: true,
      },
    });

    if (!order) {
      throw createError('Order not found', 404);
    }

    // Check if user owns this order or is admin
    if (order.userId !== req.user.id && !['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      throw createError('Access denied', 403);
    }

    res.json({
      success: true,
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw createError('Order not found', 404);
    }

    if (order.userId !== req.user.id) {
      throw createError('Access denied', 403);
    }

    // Only allow cancellation for certain statuses
    if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
      throw createError('Order cannot be cancelled at this stage', 400);
    }

    // Cancel order and refund in transaction
    await prisma.$transaction(async (tx) => {
      // Update order status
      await tx.order.update({
        where: { id },
        data: { status: 'CANCELLED' },
      });

      // Refund to wallet
      await tx.wallet.update({
        where: { userId: order.userId },
        data: { balance: { increment: order.totalAmount } },
      });

      // Create refund transaction record
      await tx.transaction.create({
        data: {
          userId: order.userId,
          type: 'REFUND',
          amount: order.totalAmount,
          description: `Refund for cancelled order ${order.orderNumber}`,
          status: 'COMPLETED',
        },
      });
    });

    logger.info(`Order cancelled: ${order.orderNumber} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Order cancelled successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { user: { firstName: { contains: search, mode: 'insensitive' } } },
        { user: { lastName: { contains: search, mode: 'insensitive' } } },
      ];
    }

    // Get orders with pagination
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
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
          orderItems: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        orders,
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

export const updateOrderStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate input
    const { error, value } = updateOrderStatusSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const { status, notes } = value;

    const order = await prisma.order.update({
      where: { id },
      data: { 
        status,
        ...(notes && { notes }),
        ...(status === 'DELIVERED' && { actualDelivery: new Date() }),
      },
      include: {
        user: true,
      },
    });

    logger.info(`Order status updated: ${order.orderNumber} to ${status} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};