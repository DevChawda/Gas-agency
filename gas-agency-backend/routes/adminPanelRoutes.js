// routes/adminRoutes.js
import express from "express";
import {
  getUsers,
  editUser,
  deleteUser,
  getDashboardStats,
} from "../controllers/adminUserController.js";
import { loginAdmin } from "../controllers/adminController.js";
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin login route
router.post("/login", loginAdmin);

// Route to get all users
router.get("/users",  getUsers, protect, adminOnly); // Removed protect, adminOnly

// Route to edit a user
router.patch("/users/:id",  editUser, protect, adminOnly); // Removed protect, adminOnly

// Route to delete a user
router.delete("/users/:id",  deleteUser, protect, adminOnly); // Removed protect, adminOnly

// Route to get dashboard statistics
router.get("/dashboard",  getDashboardStats, protect, adminOnly); // Removed protect, adminOnly

export default router;
