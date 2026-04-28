import express from 'express';
import { createValetRequest, getValetStatus, updateValetStatus } from '../controllers/valetController.js';

const router = express.Router();

router.post('/', createValetRequest);
router.get('/:bookingId', getValetStatus);
router.patch('/:bookingId/status', updateValetStatus);

export default router;
