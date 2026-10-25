import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const dashboard = asyncHandler(async (_req, res) => {
  const [rooms, bookings, guests, revenue] = await Promise.all([
    Room.countDocuments({ isActive: true }),
    Booking.countDocuments(),
    User.countDocuments({ role: 'guest' }),
    Booking.aggregate([{ $match: { paymentStatus: 'paid', status: { $ne: 'cancelled' } } }, { $group: { _id: null, total: { $sum: '$totalPrice' } } }])
  ]);
  res.json({ stats: { rooms, bookings, guests, revenue: revenue[0]?.total || 0 } });
});

export const allBookings = asyncHandler(async (_req, res) => {
  res.json({ bookings: await Booking.find().populate('user', 'name email').populate('room').sort({ createdAt: -1 }).limit(500) });
});

export const createRoom = asyncHandler(async (req, res) => {
  const { name, category, description, pricePerNight, capacity, beds, amenities, imageUrl } = req.body;
  if (!name || Number(pricePerNight) <= 0) { res.status(400); throw new Error('Room name and positive price are required'); }
  const room = await Room.create({ name, category, description, pricePerNight: Number(pricePerNight), capacity: Number(capacity) || 2, beds, amenities: Array.isArray(amenities) ? amenities : String(amenities || '').split(',').map(s => s.trim()).filter(Boolean), imageUrl });
  res.status(201).json({ room });
});

export const updateRoom = asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!room) { res.status(404); throw new Error('Room not found'); }
  res.json({ room });
});

export const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!room) { res.status(404); throw new Error('Room not found'); }
  res.json({ message: 'Room archived' });
});
