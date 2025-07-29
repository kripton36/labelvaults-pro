import express from 'express';
import { 
  createContactMessage,
  createSupportTicket,
  getSupportTickets,
  getSupportTicket,
  updateSupportTicket,
  getAllSupportTickets
} from '../controllers/supportController';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/contact', optionalAuth, createContactMessage);

// Protected user routes
router.post('/tickets', authenticate, createSupportTicket);
router.get('/tickets', authenticate, getSupportTickets);
router.get('/tickets/:id', authenticate, getSupportTicket);

// Admin routes
router.get('/admin/tickets', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), getAllSupportTickets);
router.patch('/tickets/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), updateSupportTicket);

export default router;