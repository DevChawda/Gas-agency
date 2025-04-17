import express from 'express';
import {
  createLpgBooking,
  createLubeBooking,
  getAllOrders,
  getLpgCategories,
  getLpgProducts,
  getLubesCategories,
  getLubesProducts,
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for booking submissions
router.post('/bookings/lpg', createLpgBooking);
router.post('/bookings/lubes', createLubeBooking);

// Admin route to get all orders
router.get('/admin/orders', getAllOrders, protect, adminOnly);

// Routes to fetch categories and products (likely temporary static data)
router.get('/categories/lpg', getLpgCategories);
router.get('/products/lpg', getLpgProducts);
router.get('/categories/lubes', getLubesCategories);
router.get('/products/lubes', getLubesProducts);

export default router;