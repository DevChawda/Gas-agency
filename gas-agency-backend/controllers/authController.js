import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/adminModel.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const Model = role === "admin" ? Admin : User;
    const existing = await Model.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: `${role} already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Model({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: `${role} registered successfully`,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        phone: savedUser.phone,
      },
      token: generateToken(savedUser._id, savedUser.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Admin.findOne({ email });
    let role = "admin";

    if (!user) {
      user = await User.findOne({ email });
      role = "user";
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id, role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ Proper ESM export
export { register, login };
