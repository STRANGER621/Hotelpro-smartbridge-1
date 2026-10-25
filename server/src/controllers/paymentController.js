import Stripe from 'stripe';
import Booking from '../models/Booking.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const checkout = asyncHandler(async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) { res.status(503); throw new Error('Online payment is not configured. Add STRIPE_SECRET_KEY to server/.env'); }
  const booking = await Booking.findById(req.params.bookingId).populate('room');
  if (!booking) { res.status(404); throw new Error('Booking not found'); }
  if (String(booking.user) !== String(req.user._id)) { res.status(403); throw new Error('Not allowed to pay for this booking'); }
  if (booking.status === 'cancelled') { res.status(400); throw new Error('Cancelled bookings cannot be paid'); }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price_data: { currency: 'inr', product_data: { name: booking.room.name, description: `${booking.nights} night(s)` }, unit_amount: Math.round(booking.totalPrice * 100) }, quantity: 1 }],
    success_url: `${process.env.CLIENT_URL}/bookings?payment=success`,
    cancel_url: `${process.env.CLIENT_URL}/bookings?payment=cancelled`,
    metadata: { bookingId: String(booking._id), userId: String(req.user._id) }
  });
  booking.paymentSessionId = session.id;
  await booking.save();
  res.json({ url: session.url });
});
