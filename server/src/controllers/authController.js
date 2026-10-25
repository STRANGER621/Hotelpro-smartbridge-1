import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const makeToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone });

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) { res.status(400); throw new Error('Name, email and password are required'); }
  if (password.length < 8) { res.status(400); throw new Error('Password must contain at least 8 characters'); }
  if (await User.findOne({ email: email.toLowerCase() })) { res.status(409); throw new Error('An account with this email already exists'); }
  const user = await User.create({ name, email, password, phone });
  res.status(201).json({ token: makeToken(user), user: publicUser(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || '').toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password || ''))) { res.status(401); throw new Error('Invalid email or password'); }
  res.json({ token: makeToken(user), user: publicUser(user) });
});

export const me = asyncHandler(async (req, res) => res.json({ user: publicUser(req.user) }));
