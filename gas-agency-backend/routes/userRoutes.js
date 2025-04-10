import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // Handles both user/admin registration
router.post("/login", login);

export default router;