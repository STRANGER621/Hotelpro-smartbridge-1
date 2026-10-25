import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createBooking, myBookings, cancelBooking } from '../controllers/bookingController.js';
const router = Router();
router.use(protect);
router.get('/mine', myBookings);
router.post('/', createBooking);
router.patch('/:id/cancel', cancelBooking);
export default router;
