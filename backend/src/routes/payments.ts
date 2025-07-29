import express from 'express';
import { 
  getWallet,
  addFunds,
  getTransactions,
  createPaymentIntent,
  handleWebhook
} from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Protected routes
router.get('/wallet', authenticate, getWallet);
router.post('/add-funds', authenticate, addFunds);
router.get('/transactions', authenticate, getTransactions);
router.post('/create-payment-intent', authenticate, createPaymentIntent);

// Webhook route (no auth required)
router.post('/webhook', handleWebhook);

export default router;