import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { checkout } from '../controllers/paymentController.js';
const router = Router();
router.post('/:bookingId/checkout', protect, checkout);
export default router;
