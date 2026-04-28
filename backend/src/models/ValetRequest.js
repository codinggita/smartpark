import mongoose from 'mongoose';

const valetRequestSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  valetName: {
    type: String,
    default: 'Rahul Sharma',
  },
  valetRating: {
    type: Number,
    default: 4.9,
  },
  status: {
    type: String,
    enum: ['received', 'assigned', 'picked_up', 'parked'],
    default: 'received',
  },
  eta: {
    type: Number, // in minutes
    default: 5,
  },
}, { timestamps: true });

const ValetRequest = mongoose.model('ValetRequest', valetRequestSchema);

export default ValetRequest;
