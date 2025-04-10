// routes/adminUserRoute.js
import express from "express";
import { getUsers, editUser, deleteUser } from "../controllers/adminUserController.js";

const router = express.Router();

// Get all users (for the admin panel)
router.get("/users", getUsers);

// Edit a user (admin action)
router.patch("/users/:id", editUser);

// Delete a user (admin action)
router.delete("/users/:id", deleteUser);

export default router;
