import path from 'path';
import fs from 'fs';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate userId (auto-increment or random logic)
    const userCount = await User.countDocuments();
    const userId = userCount + 1;

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      userId,
      role: "user",
    });

    // Generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Registration successful and logged in",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        userId: newUser.userId,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        userId: user.userId, 
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


//update users
export const updateUserProfile = async (req, res) => {
  try {
    // Extract fields from request body
    const { name, email, phone } = req.body;
    const userId = req.userId || req.body.userId; // Extract userId from JWT or request body

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Handle the profile image if uploaded
    let profileImage = null;
    if (req.file) {
      // Build the full URL for the uploaded image
      profileImage = `${req.protocol}://${req.get('host')}/public/Images/profileImages/${req.file.filename}`;
      console.log('Profile Image URL:', profileImage);

    }

    // Find the user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user fields (only update if a new value is provided)
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    // Update profile image if a new one is provided
    if (profileImage) {
      user.profileImage = profileImage;
    }

    // Save the updated user data
    await user.save();

    // Respond with updated user data, including the new profile image URL
    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage, // Include updated image URL
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};