// routes/adminRoutes.js
import express from "express";
import {
  getUsers,
  editUser,
  deleteUser,
  getDashboardStats,
} from "../controllers/adminUserController.js";
import { loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

// Admin login route
router.post("/login", loginAdmin);

// Route to get all users
router.get("/users",  getUsers); // Removed protect, adminOnly

// Route to edit a user
router.patch("/users/:id",  editUser); // Removed protect, adminOnly

// Route to delete a user
router.delete("/users/:id",  deleteUser); // Removed protect, adminOnly

// Route to get dashboard statistics
router.get("/dashboard",  getDashboardStats); // Removed protect, adminOnly

export default router;
