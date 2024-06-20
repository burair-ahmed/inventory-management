import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/user.model.js'; // Adjust the path as needed

dotenv.config();

const createSuperAdmin = async () => {
  const username = 'syedaliahmed22';
  const email = 'syedaliahmad22@gmail.com';
  const plainPassword = 'Syed@!ee22'; // Replace with the actual plain-text password
  const hashedPassword = bcryptjs.hashSync(plainPassword, 10);

  const newSuperAdmin = new User({
    username,
    email,
    password: hashedPassword,
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIygIMslQv6Uz84aNIdNhl93TjAk0…', // Replace with actual avatar URL
    isAdmin: true,
  });

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await newSuperAdmin.save();
    console.log('Super admin created successfully!');
  } catch (error) {
    console.error('Error creating super admin:', error);
  } finally {
    mongoose.disconnect();
  }
};

createSuperAdmin();
