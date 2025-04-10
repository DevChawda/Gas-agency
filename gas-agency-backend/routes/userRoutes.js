// gas-agency-backend/routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/userAuthController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;