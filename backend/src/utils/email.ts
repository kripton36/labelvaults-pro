import nodemailer from 'nodemailer';
import { logger } from './logger';

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  data: any;
}

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Email templates
const emailTemplates = {
  emailVerification: (data: any) => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">LabelVaults</h1>
          <p style="color: #64748b; margin: 5px 0;">Premium Label Printing Solutions</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin-top: 0;">Welcome to LabelVaults!</h2>
          <p style="color: #475569; line-height: 1.6;">Hi ${data.firstName},</p>
          <p style="color: #475569; line-height: 1.6;">
            Thank you for creating an account with LabelVaults. To complete your registration and start creating amazing labels, please verify your email address.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.verificationUrl}" 
               style="background: linear-gradient(to right, #2563eb, #7c3aed); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${data.verificationUrl}" style="color: #2563eb;">${data.verificationUrl}</a>
          </p>
        </div>
        
        <div style="text-align: center; color: #64748b; font-size: 12px;">
          <p>© 2024 LabelVaults. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `
      Welcome to LabelVaults!
      
      Hi ${data.firstName},
      
      Thank you for creating an account with LabelVaults. Please verify your email address by clicking the link below:
      
      ${data.verificationUrl}
      
      © 2024 LabelVaults. All rights reserved.
    `,
  }),

  passwordReset: (data: any) => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">LabelVaults</h1>
          <p style="color: #64748b; margin: 5px 0;">Premium Label Printing Solutions</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin-top: 0;">Password Reset Request</h2>
          <p style="color: #475569; line-height: 1.6;">Hi ${data.firstName},</p>
          <p style="color: #475569; line-height: 1.6;">
            We received a request to reset your password for your LabelVaults account. Click the button below to create a new password.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetUrl}" 
               style="background: linear-gradient(to right, #2563eb, #7c3aed); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #ef4444; font-size: 14px; margin-top: 20px;">
            ⚠️ This link will expire in ${data.expiryTime}.
          </p>
          
          <p style="color: #64748b; font-size: 14px;">
            If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.
          </p>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${data.resetUrl}" style="color: #2563eb;">${data.resetUrl}</a>
          </p>
        </div>
        
        <div style="text-align: center; color: #64748b; font-size: 12px;">
          <p>© 2024 LabelVaults. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `
      Password Reset Request
      
      Hi ${data.firstName},
      
      We received a request to reset your password for your LabelVaults account. Click the link below to create a new password:
      
      ${data.resetUrl}
      
      This link will expire in ${data.expiryTime}.
      
      If you didn't request this password reset, please ignore this email.
      
      © 2024 LabelVaults. All rights reserved.
    `,
  }),

  orderConfirmation: (data: any) => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">LabelVaults</h1>
          <p style="color: #64748b; margin: 5px 0;">Premium Label Printing Solutions</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin-top: 0;">Order Confirmation</h2>
          <p style="color: #475569; line-height: 1.6;">Hi ${data.firstName},</p>
          <p style="color: #475569; line-height: 1.6;">
            Thank you for your order! We've received your order and it's being processed.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> ${data.orderNumber}</p>
            <p><strong>Total Amount:</strong> $${data.totalAmount}</p>
            <p><strong>Estimated Delivery:</strong> ${data.estimatedDelivery}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.trackingUrl}" 
               style="background: linear-gradient(to right, #2563eb, #7c3aed); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Track Your Order
            </a>
          </div>
        </div>
        
        <div style="text-align: center; color: #64748b; font-size: 12px;">
          <p>© 2024 LabelVaults. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `
      Order Confirmation
      
      Hi ${data.firstName},
      
      Thank you for your order! We've received your order and it's being processed.
      
      Order Details:
      Order Number: ${data.orderNumber}
      Total Amount: $${data.totalAmount}
      Estimated Delivery: ${data.estimatedDelivery}
      
      Track your order: ${data.trackingUrl}
      
      © 2024 LabelVaults. All rights reserved.
    `,
  }),
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const transporter = createTransporter();
    
    // Get template
    const template = emailTemplates[options.template as keyof typeof emailTemplates];
    if (!template) {
      throw new Error(`Email template '${options.template}' not found`);
    }
    
    const { html, text } = template(options.data);
    
    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      html,
      text,
    };
    
    const result = await transporter.sendMail(mailOptions);
    
    logger.info(`Email sent successfully to ${options.to}`, {
      messageId: result.messageId,
      template: options.template,
    });
  } catch (error) {
    logger.error('Failed to send email:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      to: options.to,
      template: options.template,
    });
    throw error;
  }
};