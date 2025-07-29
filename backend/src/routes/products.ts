import express from 'express';
import { 
  getProducts, 
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  calculatePrice
} from '../controllers/productController';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getProducts);
router.get('/:id', optionalAuth, getProduct);
router.post('/calculate-price', calculatePrice);

// Admin routes
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), createProduct);
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), updateProduct);
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), deleteProduct);

export default router;