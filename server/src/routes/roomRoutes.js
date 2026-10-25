import { Router } from 'express';
import { listRooms, getRoom, checkAvailability } from '../controllers/roomController.js';
const router = Router();
router.get('/', listRooms);
router.get('/:id/availability', checkAvailability);
router.get('/:id', getRoom);
export default router;
