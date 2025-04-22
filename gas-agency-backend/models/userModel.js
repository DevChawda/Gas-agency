// userModel.js
import mongoose from 'mongoose';

function generateUserId() {
  return 'user-' + Math.random().toString(36).substring(2, 15); // Simple unique userId
}

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    default: () => generateUserId(),
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // This can be a base64 string or a URL
    default: "",
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpiry: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
