// routes/adminRoutes.js
import express from "express";
import {
  getUsers,
  editUser,
  deleteUser,
  loginAdmin,
  getDashboardStats,
} from "../controllers/adminUserController.js";

const router = express.Router();

// Admin login route
router.post("/login", loginAdmin);

// Route to get all users
router.get("/users", getUsers);

// Route to edit a user
router.patch("/users/:id", editUser);

// Route to delete a user
router.delete("/users/:id", deleteUser);

// Route to get dashboard statistics
router.get("/dashboard", getDashboardStats);

export default router;