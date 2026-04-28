import express from 'express';
import { getAllZones, getZoneById, createZone, updateZone } from '../controllers/parkingZoneController.js';

const router = express.Router();

router.get('/', getAllZones);
router.get('/:id', getZoneById);
router.post('/', createZone);
router.put('/:id', updateZone);

export default router;
