// gas-agency-backend/routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, updateUserProfile, sendOtp, verifyOtp, resetPassword } from '../controllers/userAuthController.js';
import upload from '../middleware/uploadMiddleware.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/update-profile', upload.single('profileImage'), updateUserProfile);

// Forgot Password - OTP flow
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', verifyToken, resetPassword);

export default router;
