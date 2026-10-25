import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createBooking = asyncHandler(async (req, res) => {
  const { roomId, checkIn, checkOut, guests } = req.body;
  const start = new Date(checkIn), end = new Date(checkOut), guestCount = Number(guests);
  if (!roomId || !checkIn || !checkOut || !Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start) {
    res.status(400); throw new Error('Choose valid check-in and check-out dates');
  }
  const room = await Room.findOne({ _id: roomId, isActive: true });
  if (!room) { res.status(404); throw new Error('Room not found'); }
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > room.capacity) { res.status(400); throw new Error(`This room accommodates 1–${room.capacity} guests`); }
  const conflict = await Booking.findOne({ room: roomId, status: { $ne: 'cancelled' }, checkIn: { $lt: end }, checkOut: { $gt: start } });
  if (conflict) { res.status(409); throw new Error('This room is not available for those dates'); }
  const nights = Math.ceil((end - start) / 86400000);
  const booking = await Booking.create({ user: req.user._id, room: roomId, checkIn: start, checkOut: end, guests: guestCount, nights, totalPrice: nights * room.pricePerNight });
  res.status(201).json({ booking: await booking.populate('room') });
});

export const myBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('room').sort({ createdAt: -1 });
  res.json({ bookings });
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) { res.status(404); throw new Error('Booking not found'); }
  if (String(booking.user) !== String(req.user._id) && !['admin', 'staff'].includes(req.user.role)) { res.status(403); throw new Error('Not allowed to cancel this booking'); }
  if (booking.status === 'cancelled') { res.status(400); throw new Error('Booking is already cancelled'); }
  if (new Date(booking.checkIn) <= new Date()) { res.status(400); throw new Error('Past or current bookings cannot be cancelled online'); }
  booking.status = 'cancelled';
  await booking.save();
  res.json({ booking });
});
