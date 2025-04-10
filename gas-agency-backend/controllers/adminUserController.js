// controllers/adminUserController.js
import Admin from "../models/adminModel.js";
import User from "../models/User.js"; // ✅ Corrected import path and filename
import Transaction from "../models/transactionModel.js";
import Enquiry from "../models/enquiryModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign(
        { adminId: admin._id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (you'll need authentication middleware)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// @desc    Edit a user
// @route   PATCH /api/admin/users/:id
// @access  Private
const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(500).json({ message: "Error editing user" });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private (you'll need authentication middleware)
const getDashboardStats = async (req, res) => {
  try {
    const totalConsumers = await User.countDocuments({});
    const pendingOrders = await Transaction.countDocuments({ status: 'pending' });
    const newComplaints = await Enquiry.countDocuments({});
    const totalTransactions = await Transaction.countDocuments({});

    res.json({
      totalConsumers,
      pendingOrders,
      newComplaints,
      totalTransactions,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Error fetching dashboard statistics" });
  }
};

export { loginAdmin, getUsers, editUser, deleteUser, getDashboardStats };