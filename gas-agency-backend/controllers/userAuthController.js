import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      userId: `user-${Date.now()}`,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send user data and token in the response
    res.status(200).json({
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage || "",
      },
      token,
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { name, email, phone } = req.body;
  const userId = req.userId || req.body.userId;

  try {
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    if (req.file) user.profileImage = req.file.path;

    await user.save();
    res.status(200).json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // Expiry in 10 mins
    await user.save();

    await sendEmail(email, 'Password Reset OTP', `Your OTP is: ${otp}`);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    console.log("Stored OTP:", user.otp);
    console.log("Stored OTP Expiry Time:", new Date(user.otpExpiry)); // Checking OTP expiry time
    console.log("Current Time:", new Date()); // Checking current time

    // Check if the OTP matches and if it is expired
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // OTP is valid, now create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload with user ID and email
      process.env.JWT_SECRET, // Secret key for signing the JWT token
      { expiresIn: '1h' } // Optional: set the token expiration time
    );

    // Send success response along with the token
    res.status(200).json({
      message: 'OTP verified successfully',
      token, // Send the token in the response
    });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const user = req.user; // Comes from verifyToken middleware

    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};