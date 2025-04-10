// seedAdmin.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/adminModel.js"; // adjust path if needed
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("✅ Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("yourAdminPassword", 10);

    const admin = new Admin({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
