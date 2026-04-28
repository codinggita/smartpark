import express from 'express';
import cors from 'cors';
import parkingZoneRoutes from './routes/parkingZoneRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import valetRoutes from './routes/valetRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'SmartPark API is running' });
});

// API Routes
app.use('/api/zones', parkingZoneRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/valet', valetRoutes);
app.use('/api/users', userRoutes);

// Global Error Handler (must be last)
app.use(errorHandler);

export default app;
