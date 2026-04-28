import mongoose from 'mongoose';

const parkingZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['standard', 'premium', 'valet'],
    required: true,
  },
  totalSpots: {
    type: Number,
    required: true,
  },
  availableSpots: {
    type: Number,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  location: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
}, { timestamps: true });

const ParkingZone = mongoose.model('ParkingZone', parkingZoneSchema);

export default ParkingZone;
