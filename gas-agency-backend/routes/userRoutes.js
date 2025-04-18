// gas-agency-backend/routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, updateUserProfile } from '../controllers/userAuthController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
// New route for updating user profile
router.patch('/update-profile', upload.single('profileImage'), updateUserProfile);

export default router;