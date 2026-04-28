import ParkingZone from '../models/ParkingZone.js';

// GET /api/zones — Get all parking zones
export const getAllZones = async (req, res, next) => {
  try {
    const zones = await ParkingZone.find();
    res.status(200).json({ success: true, data: zones });
  } catch (error) {
    next(error);
  }
};

// GET /api/zones/:id — Get a single zone by ID
export const getZoneById = async (req, res, next) => {
  try {
    const zone = await ParkingZone.findById(req.params.id);
    if (!zone) {
      return res.status(404).json({ success: false, message: 'Zone not found' });
    }
    res.status(200).json({ success: true, data: zone });
  } catch (error) {
    next(error);
  }
};

// POST /api/zones — Create a new parking zone
export const createZone = async (req, res, next) => {
  try {
    const zone = await ParkingZone.create(req.body);
    res.status(201).json({ success: true, data: zone });
  } catch (error) {
    next(error);
  }
};

// PUT /api/zones/:id — Update a parking zone
export const updateZone = async (req, res, next) => {
  try {
    const zone = await ParkingZone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!zone) {
      return res.status(404).json({ success: false, message: 'Zone not found' });
    }
    res.status(200).json({ success: true, data: zone });
  } catch (error) {
    next(error);
  }
};
