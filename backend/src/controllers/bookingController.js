import Booking from '../models/Booking.js';
import ParkingZone from '../models/ParkingZone.js';

// POST /api/bookings — Create a new booking
export const createBooking = async (req, res, next) => {
  try {
    const { zoneId, licensePlate, date, time, duration, totalAmount } = req.body;

    // Decrement available spots in the zone (if zoneId provided)
    if (zoneId) {
      const zone = await ParkingZone.findById(zoneId);
      if (zone && zone.availableSpots > 0) {
        zone.availableSpots -= 1;
        await zone.save();
      }
    }

    const booking = await Booking.create({
      userId: req.body.userId || null,
      zoneId: zoneId || null,
      licensePlate,
      date,
      time,
      duration,
      totalAmount,
      status: 'pending',
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/:id — Get a booking by ID
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('zoneId')
      .populate('userId');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/user/:userId — Get all bookings for a user
export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('zoneId')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/bookings/:id/status — Update booking status
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, transactionId } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, ...(transactionId && { transactionId }) },
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};
