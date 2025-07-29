import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Stripe from 'stripe';
import { prisma } from '../utils/database';
import { createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

interface AuthRequest extends Request {
  user?: any;
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Validation schemas
const addFundsSchema = Joi.object({
  amount: Joi.number().positive().min(5).max(10000).required(),
  paymentMethod: Joi.string().valid('stripe', 'crypto').required(),
  cryptoType: Joi.string().valid('bitcoin', 'ethereum', 'usdt').optional(),
});

const createPaymentIntentSchema = Joi.object({
  amount: Joi.number().positive().min(5).max(10000).required(),
});

export const getWallet = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId: req.user.id },
    });

    if (!wallet) {
      // Create wallet if it doesn't exist
      const newWallet = await prisma.wallet.create({
        data: {
          userId: req.user.id,
          balance: 0,
        },
      });

      return res.json({
        success: true,
        data: { wallet: newWallet },
      });
    }

    res.json({
      success: true,
      data: { wallet },
    });
  } catch (error) {
    next(error);
  }
};

export const addFunds = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const { error, value } = addFundsSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const { amount, paymentMethod, cryptoType } = value;

    if (paymentMethod === 'stripe') {
      // Handle Stripe payment (for demo, we'll simulate success)
      await prisma.$transaction(async (tx) => {
        // Update wallet balance
        await tx.wallet.upsert({
          where: { userId: req.user.id },
          update: { balance: { increment: amount } },
          create: { userId: req.user.id, balance: amount },
        });

        // Create transaction record
        await tx.transaction.create({
          data: {
            userId: req.user.id,
            type: 'DEPOSIT',
            amount,
            description: `Funds added via ${paymentMethod}`,
            status: 'COMPLETED',
            paymentMethod,
          },
        });
      });

      logger.info(`Funds added: $${amount} for user ${req.user.email} via ${paymentMethod}`);

      res.json({
        success: true,
        message: 'Funds added successfully',
      });
    } else if (paymentMethod === 'crypto') {
      // Generate crypto payment address (mock)
      const cryptoAddresses = {
        bitcoin: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        ethereum: '0x742d35Cc6634C0532925a3b8D4C9db96590b4c5d',
        usdt: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5oREqjK',
      };

      const address = cryptoAddresses[cryptoType as keyof typeof cryptoAddresses];

      res.json({
        success: true,
        message: 'Crypto payment initiated',
        data: {
          paymentAddress: address,
          amount,
          cryptoType,
          instructions: `Send exactly ${amount} USD worth of ${cryptoType?.toUpperCase()} to the address above. Funds will be credited after confirmation.`,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const type = req.query.type as string;

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = { userId: req.user.id };

    if (type) {
      where.type = type;
    }

    // Get transactions with pagination
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.transaction.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        transactions,
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

export const createPaymentIntent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const { error, value } = createPaymentIntentSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const { amount } = value;

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        userId: req.user.id,
        type: 'wallet_topup',
      },
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        amount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sig = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      logger.error('Webhook signature verification failed:', err);
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        if (paymentIntent.metadata.type === 'wallet_topup') {
          const userId = paymentIntent.metadata.userId;
          const amount = paymentIntent.amount / 100; // Convert from cents

          await prisma.$transaction(async (tx) => {
            // Update wallet balance
            await tx.wallet.upsert({
              where: { userId },
              update: { balance: { increment: amount } },
              create: { userId, balance: amount },
            });

            // Create transaction record
            await tx.transaction.create({
              data: {
                userId,
                type: 'DEPOSIT',
                amount,
                description: 'Funds added via Stripe',
                status: 'COMPLETED',
                paymentMethod: 'stripe',
                stripePaymentId: paymentIntent.id,
              },
            });
          });

          logger.info(`Webhook processed: Funds added for user ${userId}, amount: $${amount}`);
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        logger.error('Payment failed:', failedPayment.id);
        break;

      default:
        logger.info(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
};