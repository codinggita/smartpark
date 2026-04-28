import express from 'express';
import { createBooking, getBookingById, getUserBookings, updateBookingStatus, getAllBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/', getAllBookings);
router.post('/', createBooking);
router.get('/:id', getBookingById);
router.get('/user/:userId', getUserBookings);
router.patch('/:id/status', updateBookingStatus);

export default router;
