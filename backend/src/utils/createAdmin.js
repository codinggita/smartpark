import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const adminData = {
      firebaseUid: 'PENDING_FIREBASE_UID_' + Date.now(),
      email: 'nishit.g.doshi.cg@gmail.com',
      displayName: 'Nishit Doshi',
      role: 'admin'
    };

    const existingUser = await User.findOne({ email: adminData.email });

    if (existingUser) {
      existingUser.role = 'admin';
      existingUser.displayName = adminData.displayName;
      await existingUser.save();
      console.log('Existing user updated to Admin:', adminData.email);
    } else {
      await User.create(adminData);
      console.log('New Admin record created in MongoDB:', adminData.email);
    }

    console.log('SUCCESS: Admin record is ready. Please sign up with this email in the frontend.');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
