import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // 'user' or 'admin'
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;