import User from '../models/User.js';

// POST /api/users/sync
// Syncs a Firebase user with our MongoDB database
export const syncUser = async (req, res, next) => {
  try {
    const { firebaseUid, email, displayName, role } = req.body;

    let user = await User.findOne({ 
      $or: [{ firebaseUid }, { email }] 
    });

    if (user) {
      // Update existing user
      user.firebaseUid = firebaseUid; // Link UID if it was missing
      user.email = email || user.email;
      user.displayName = displayName || user.displayName;
      
      // Prevent downgrading from admin to user
      if (role === 'admin') {
        user.role = 'admin';
      }
      // If role is user but they are already admin, keep them as admin
      
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        firebaseUid,
        email,
        displayName,
        role: role || 'user',
      });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:firebaseUid
export const getUserByFirebaseUid = async (req, res, next) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
