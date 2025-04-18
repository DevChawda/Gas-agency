// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   userId: { type: Number, unique: true, index: true }, // Add this field
// }, {
//   timestamps: true,
// });

// const User = mongoose.model("User", userSchema);
// export default User;
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
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  profileImage: {
    type: String, // This can be a base64 string or a URL
    default: "",
  },
});

const User = mongoose.model('User', userSchema);

export default User; // ✅ Use default export for ESM compatibility

