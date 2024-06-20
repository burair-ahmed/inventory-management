import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const createAdmin = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newAdmin = new User({ username, email, password: hashedPassword, role: 'admin' });
  try {
    await newAdmin.save();
    res.status(201).json('Admin created successfully!');
  } catch (error) {
    next(error);
  }
};

export const assignListing = async (req, res, next) => {
  const { userId, listingId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return next(errorHandler(404, 'User not found!'));

    const listing = await Listing.findById(listingId);
    if (!listing) return next(errorHandler(404, 'Listing not found!'));

    listing.userRef = userId;
    await listing.save();

    res.status(200).json('Listing assigned to admin successfully!');
  } catch (error) {
    next(error);
  }
};