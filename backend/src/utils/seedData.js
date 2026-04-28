import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ParkingZone from '../models/ParkingZone.js';

dotenv.config();

const seedZones = [
  {
    name: 'Zone A - Ground Level',
    type: 'standard',
    totalSpots: 50,
    availableSpots: 38,
    pricePerHour: 50,
    location: { lat: 28.6139, lng: 77.2090 },
  },
  {
    name: 'Zone B - Basement 1',
    type: 'standard',
    totalSpots: 40,
    availableSpots: 22,
    pricePerHour: 50,
    location: { lat: 28.6145, lng: 77.2095 },
  },
  {
    name: 'Premium Covered - Level 2',
    type: 'premium',
    totalSpots: 30,
    availableSpots: 15,
    pricePerHour: 150,
    location: { lat: 28.6130, lng: 77.2085 },
  },
  {
    name: 'VIP Valet Zone',
    type: 'valet',
    totalSpots: 10,
    availableSpots: 6,
    pricePerHour: 300,
    location: { lat: 28.6135, lng: 77.2092 },
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    await ParkingZone.deleteMany({});
    console.log('Cleared existing parking zones.');

    const created = await ParkingZone.insertMany(seedZones);
    console.log(`Seeded ${created.length} parking zones successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();
