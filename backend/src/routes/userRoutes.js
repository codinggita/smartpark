import express from 'express';
import { syncUser, getUserByFirebaseUid } from '../controllers/userController.js';

const router = express.Router();

router.post('/sync', syncUser);
router.get('/:firebaseUid', getUserByFirebaseUid);

export default router;
