import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Standard', 'Deluxe', 'Suite', 'Family'], default: 'Standard' },
  description: { type: String, default: '' },
  pricePerNight: { type: Number, required: true, min: 1 },
  capacity: { type: Number, default: 2, min: 1 },
  beds: { type: String, default: '1 King bed' },
  amenities: [{ type: String }],
  imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('Room', roomSchema);
