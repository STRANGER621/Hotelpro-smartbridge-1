import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './utils/connectDB.js';
import Room from './models/Room.js';

const rooms = [
  { name: 'Classic King Room', category: 'Standard', description: 'A calm, comfortable room with warm wood accents and everything you need for a restful stay.', pricePerNight: 4200, capacity: 2, beds: '1 King bed', amenities: ['Wi-Fi', 'Air conditioning', 'Smart TV', 'Coffee maker'], imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Garden Deluxe', category: 'Deluxe', description: 'A spacious retreat with garden views, a sitting area, and refined contemporary details.', pricePerNight: 6800, capacity: 2, beds: '1 King bed', amenities: ['Wi-Fi', 'Garden view', 'Mini bar', 'Rain shower'], imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Signature Suite', category: 'Suite', description: 'An expansive suite for guests who want extra space, a separate lounge, and premium comforts.', pricePerNight: 11500, capacity: 3, beds: '1 King bed + sofa bed', amenities: ['Wi-Fi', 'Lounge', 'Bathtub', 'Room service'], imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Family Residence', category: 'Family', description: 'A generous family room with flexible sleeping arrangements and space to unwind together.', pricePerNight: 8900, capacity: 5, beds: '2 Queen beds', amenities: ['Wi-Fi', 'Connecting area', 'Mini fridge', 'Kids amenities'], imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80' },
  { name: 'City View Deluxe', category: 'Deluxe', description: 'Bright interiors and elevated city views make this room ideal for business and leisure.', pricePerNight: 7200, capacity: 2, beds: '1 Queen bed', amenities: ['Wi-Fi', 'Work desk', 'City view', 'Smart TV'], imageUrl: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Penthouse Suite', category: 'Suite', description: 'A private, high-floor hideaway with elegant furnishings and a generous living area.', pricePerNight: 18500, capacity: 4, beds: '1 King bed + 2 singles', amenities: ['Wi-Fi', 'Private terrace', 'Lounge', 'Premium bath'], imageUrl: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=80' }
];
try {
  await connectDB();
  await Room.deleteMany({});
  await Room.insertMany(rooms);
  console.log(`Seeded ${rooms.length} rooms`);
} finally {
  await mongoose.disconnect();
}
