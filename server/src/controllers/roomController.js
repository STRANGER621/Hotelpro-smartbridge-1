import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listRooms = asyncHandler(async (req, res) => {
  const { category, guests, q } = req.query;
  const filter = { isActive: true };
  if (category && category !== 'All') filter.category = category;
  if (guests) filter.capacity = { $gte: Number(guests) };
  if (q) filter.$or = [{ name: { $regex: q, $options: 'i' } }, { description: { $regex: q, $options: 'i' } }];
  res.json({ rooms: await Room.find(filter).sort({ pricePerNight: 1 }) });
});

export const getRoom = asyncHandler(async (req, res) => {
  const room = await Room.findOne({ _id: req.params.id, isActive: true });
  if (!room) { res.status(404); throw new Error('Room not found'); }
  res.json({ room });
});

export const checkAvailability = asyncHandler(async (req, res) => {
  const { checkIn, checkOut } = req.query;
  if (!checkIn || !checkOut || new Date(checkOut) <= new Date(checkIn)) { res.status(400); throw new Error('Valid check-in and check-out dates are required'); }
  const busy = await Booking.find({
    room: req.params.id, status: { $ne: 'cancelled' },
    checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) }
  }).select('_id');
  res.json({ available: busy.length === 0 });
});
