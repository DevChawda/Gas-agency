import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from 'express-validator';

// Admin login handler
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  
  // Validate email and password format
  await body('email').isEmail().withMessage('Invalid email format').run(req);
  await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("👉 Login request received:", { email, password });

  try {
    // Check if email and password are provided
    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the admin in the database by email
    const admin = await Admin.findOne({ email });
    console.log("🔍 Found admin in DB:", admin);

    // If no admin is found, return a 401 error
    if (!admin) {
      console.log("❌ Admin not found in DB");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the hashed password stored in DB with the entered password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("🔑 Password match:", isMatch);

    // If passwords don't match, return a 401 error
    if (!isMatch) {
      console.log("❌ Incorrect password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If credentials are correct, generate a JWT token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    console.log("✅ Login successful!");

    // Return admin data along with the JWT token
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token,
    });
  } catch (err) {
    // Handle any errors that occur during the process
    console.log("💥 Error in login:", err.message);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
