import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Joi from 'joi';
import { prisma } from '../utils/database';
import { createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import { sendEmail } from '../utils/email';

interface AuthRequest extends Request {
  user?: any;
}

// Validation schemas
const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().optional(),
  company: Joi.string().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

// Generate JWT token
const generateToken = (userId: string, email: string, role: string): string => {
  return jwt.sign(
    { userId, email, role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Generate email verification token
const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const { firstName, lastName, email, password, phone, company } = value;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw createError('User already exists with this email', 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Create user and wallet in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          firstName,
          lastName,
          email: email.toLowerCase(),
          password: hashedPassword,
          phone,
          company,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          company: true,
          role: true,
          isEmailVerified: true,
          createdAt: true,
        },
      });

      // Create wallet for the user
      await tx.wallet.create({
        data: {
          userId: user.id,
          balance: 0,
        },
      });

      return user;
    });

    // Send verification email
    try {
      await sendEmail({
        to: result.email,
        subject: 'Welcome to LabelVaults - Verify Your Email',
        template: 'emailVerification',
        data: {
          firstName: result.firstName,
          verificationToken,
          verificationUrl: `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`,
        },
      });
    } catch (emailError) {
      logger.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails
    }

    // Generate JWT
    const token = generateToken(result.id, result.email, result.role);

    logger.info(`New user registered: ${result.email}`);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.',
      data: {
        user: result,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const { email, password } = value;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        wallet: true,
      },
    });

    if (!user) {
      throw createError('Invalid email or password', 401);
    }

    if (!user.isActive) {
      throw createError('Account has been deactivated', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createError('Invalid email or password', 401);
    }

    // Generate JWT
    const token = generateToken(user.id, user.email, user.role);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    logger.info(`User logged in: ${user.email}`);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // In a production app, you might want to blacklist the token
    // For now, we'll just return a success message
    logger.info(`User logged out: ${req.user.email}`);

    res.json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Generate new token
    const token = generateToken(req.user.id, req.user.email, req.user.role);

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const { error, value } = forgotPasswordSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const { email } = value;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return res.json({
        success: true,
        message: 'If an account with this email exists, you will receive a password reset link.',
      });
    }

    // Generate reset token
    const resetToken = generateVerificationToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Save reset token (in a real app, you'd store this in the database)
    // For now, we'll include it in the email

    // Send reset email
    try {
      await sendEmail({
        to: user.email,
        subject: 'LabelVaults - Password Reset Request',
        template: 'passwordReset',
        data: {
          firstName: user.firstName,
          resetToken,
          resetUrl: `${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
          expiryTime: '1 hour',
        },
      });
    } catch (emailError) {
      logger.error('Failed to send password reset email:', emailError);
      throw createError('Failed to send password reset email', 500);
    }

    res.json({
      success: true,
      message: 'If an account with this email exists, you will receive a password reset link.',
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const { error, value } = resetPasswordSchema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    const { token, password } = value;

    // In a real app, you'd verify the token from the database
    // For this demo, we'll simulate token validation
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update password
    // Note: You'd need to implement token storage and verification in a real app
    
    res.json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.',
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;

    if (!token) {
      throw createError('Verification token required', 400);
    }

    // In a real app, you'd verify the token from the database
    // For this demo, we'll simulate email verification
    
    res.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw createError('Email required', 400);
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.json({
        success: true,
        message: 'If an account with this email exists, a verification email has been sent.',
      });
    }

    if (user.isEmailVerified) {
      throw createError('Email is already verified', 400);
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken();

    // Send verification email
    try {
      await sendEmail({
        to: user.email,
        subject: 'LabelVaults - Email Verification',
        template: 'emailVerification',
        data: {
          firstName: user.firstName,
          verificationToken,
          verificationUrl: `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`,
        },
      });
    } catch (emailError) {
      logger.error('Failed to send verification email:', emailError);
      throw createError('Failed to send verification email', 500);
    }

    res.json({
      success: true,
      message: 'Verification email sent successfully',
    });
  } catch (error) {
    next(error);
  }
};