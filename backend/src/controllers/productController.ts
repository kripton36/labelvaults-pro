import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { prisma } from '../utils/database';
import { createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

interface AuthRequest extends Request {
  user?: any;
}

// Validation schemas
const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  category: Joi.string().valid(
    'PRODUCT_LABELS',
    'SHIPPING_LABELS', 
    'SECURITY_LABELS',
    'CUSTOM_LABELS',
    'INDUSTRIAL_LABELS',
    'ROLL_LABELS'
  ).required(),
  basePrice: Joi.number().positive().required(),
  materials: Joi.array().items(Joi.string()).min(1).required(),
  finishes: Joi.array().items(Joi.string()).optional(),
  features: Joi.array().items(Joi.string()).min(1).required(),
  minQuantity: Joi.number().integer().positive().required(),
  maxQuantity: Joi.number().integer().positive().optional(),
});

const updateProductSchema = createProductSchema.fork(['name', 'description', 'category', 'basePrice', 'materials', 'features', 'minQuantity'], (schema) => schema.optional());

const calculatePriceSchema = Joi.object({
  productId: Joi.string().optional(),
  category: Joi.string().valid(
    'PRODUCT_LABELS',
    'SHIPPING_LABELS', 
    'SECURITY_LABELS',
    'CUSTOM_LABELS',
    'INDUSTRIAL_LABELS',
    'ROLL_LABELS'
  ).optional(),
  quantity: Joi.number().integer().positive().required(),
  material: Joi.string().optional(),
  finish: Joi.string().optional(),
  customSpecs: Joi.object().optional(),
});

// Pricing tiers and multipliers
const pricingTiers = {
  STARTER: { multiplier: 1.0, minQuantity: 100 },
  PROFESSIONAL: { multiplier: 0.85, minQuantity: 500 },
  ENTERPRISE: { multiplier: 0.75, minQuantity: 2000 },
};

const materialMultipliers = {
  paper: 1.0,
  vinyl: 1.2,
  polyester: 1.3,
  waterproof: 1.4,
  thermal: 1.1,
  security: 2.0,
  premium: 1.5,
  metallic: 1.8,
  clear: 1.3,
  textured: 1.4,
};

const finishMultipliers = {
  matte: 1.0,
  gloss: 1.1,
  'foil-stamping': 1.8,
  embossing: 2.0,
  'uv-coating': 1.3,
  laminated: 1.2,
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const category = req.query.category as string;
    const search = req.query.search as string;

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = { isActive: true };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { features: { has: search } },
      ];
    }

    // Get products with pagination
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        products,
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

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw createError('Product not found', 404);
    }

    if (!product.isActive) {
      throw createError('Product is not available', 404);
    }

    res.json({
      success: true,
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const { error, value } = createProductSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const product = await prisma.product.create({
      data: value,
    });

    logger.info(`Product created: ${product.name} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate input
    const { error, value } = updateProductSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const product = await prisma.product.update({
      where: { id },
      data: value,
    });

    logger.info(`Product updated: ${product.name} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Check if product has any orders
    const orderCount = await prisma.orderItem.count({
      where: { productId: id },
    });

    if (orderCount > 0) {
      // Soft delete by deactivating
      await prisma.product.update({
        where: { id },
        data: { isActive: false },
      });
    } else {
      // Hard delete if no orders
      await prisma.product.delete({
        where: { id },
      });
    }

    logger.info(`Product deleted: ${id} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const calculatePrice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const { error, value } = calculatePriceSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const { productId, category, quantity, material, finish, customSpecs } = value;

    let basePrice = 0.12; // Default base price per unit

    // Get product-specific pricing if productId provided
    if (productId) {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw createError('Product not found', 404);
      }

      basePrice = product.basePrice;
    } else if (category) {
      // Use category-based pricing
      const categoryPricing = {
        PRODUCT_LABELS: 0.12,
        SHIPPING_LABELS: 0.08,
        SECURITY_LABELS: 0.25,
        CUSTOM_LABELS: 0.18,
        INDUSTRIAL_LABELS: 0.35,
        ROLL_LABELS: 0.10,
      };

      basePrice = categoryPricing[category] || 0.12;
    }

    // Apply material multiplier
    let materialMultiplier = 1.0;
    if (material && materialMultipliers[material.toLowerCase()]) {
      materialMultiplier = materialMultipliers[material.toLowerCase()];
    }

    // Apply finish multiplier
    let finishMultiplier = 1.0;
    if (finish && finishMultipliers[finish.toLowerCase()]) {
      finishMultiplier = finishMultipliers[finish.toLowerCase()];
    }

    // Determine pricing tier based on quantity
    let tierMultiplier = pricingTiers.STARTER.multiplier;
    let tierName = 'STARTER';

    if (quantity >= pricingTiers.ENTERPRISE.minQuantity) {
      tierMultiplier = pricingTiers.ENTERPRISE.multiplier;
      tierName = 'ENTERPRISE';
    } else if (quantity >= pricingTiers.PROFESSIONAL.minQuantity) {
      tierMultiplier = pricingTiers.PROFESSIONAL.multiplier;
      tierName = 'PROFESSIONAL';
    }

    // Apply quantity discounts for very large orders
    let quantityDiscountMultiplier = 1.0;
    if (quantity >= 10000) {
      quantityDiscountMultiplier = 0.9; // 10% discount for 10k+
    } else if (quantity >= 5000) {
      quantityDiscountMultiplier = 0.95; // 5% discount for 5k+
    }

    // Calculate final price
    const unitPrice = basePrice * materialMultiplier * finishMultiplier * tierMultiplier * quantityDiscountMultiplier;
    const totalPrice = unitPrice * quantity;

    // Calculate estimated delivery time
    let estimatedDays = 7; // Default
    if (quantity >= 5000) {
      estimatedDays = 10;
    } else if (quantity >= 2000) {
      estimatedDays = 8;
    } else if (quantity >= 500) {
      estimatedDays = 5;
    } else {
      estimatedDays = 3;
    }

    const pricing = {
      unitPrice: Math.round(unitPrice * 100) / 100,
      totalPrice: Math.round(totalPrice * 100) / 100,
      quantity,
      tier: tierName,
      estimatedDeliveryDays: estimatedDays,
      breakdown: {
        basePrice,
        materialMultiplier,
        finishMultiplier,
        tierMultiplier,
        quantityDiscountMultiplier,
      },
    };

    res.json({
      success: true,
      data: { pricing },
    });
  } catch (error) {
    next(error);
  }
};