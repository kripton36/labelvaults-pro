import express from 'express';
import { 
  getProfile, 
  updateProfile, 
  changePassword,
  deleteAccount,
  getUsers
} from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Protected routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.patch('/change-password', authenticate, changePassword);
router.delete('/account', authenticate, deleteAccount);

// Admin routes
router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), getUsers);

export default router;