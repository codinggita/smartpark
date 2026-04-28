import ValetRequest from '../models/ValetRequest.js';

// POST /api/valet — Create a new valet request
export const createValetRequest = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const valetRequest = await ValetRequest.create({ bookingId });
    res.status(201).json({ success: true, data: valetRequest });
  } catch (error) {
    next(error);
  }
};

// GET /api/valet/:bookingId — Get valet status for a booking
export const getValetStatus = async (req, res, next) => {
  try {
    const valetRequest = await ValetRequest.findOne({ bookingId: req.params.bookingId })
      .populate('bookingId');
    if (!valetRequest) {
      return res.status(404).json({ success: false, message: 'Valet request not found' });
    }
    res.status(200).json({ success: true, data: valetRequest });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/valet/:bookingId/status — Update valet status
export const updateValetStatus = async (req, res, next) => {
  try {
    const { status, eta } = req.body;
    const valetRequest = await ValetRequest.findOneAndUpdate(
      { bookingId: req.params.bookingId },
      { status, ...(eta !== undefined && { eta }) },
      { new: true, runValidators: true }
    );
    if (!valetRequest) {
      return res.status(404).json({ success: false, message: 'Valet request not found' });
    }
    res.status(200).json({ success: true, data: valetRequest });
  } catch (error) {
    next(error);
  }
};
