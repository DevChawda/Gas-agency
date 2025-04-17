import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler';

// Get all users
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users.map(user => ({
        _id: user._id,
        id: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
    })));
});

// Edit a user
export const editUser = asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        ...req.body,
        userId: userId
    }, {
        new: true,
    });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
});

// Delete a user
export const deleteUser = asyncHandler(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
});

// Dashboard stats
export const getDashboardStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await Admin.countDocuments();

    res.json({
        totalUsers,
        totalAdmins,
        message: "Dashboard stats fetched successfully",
    });
});