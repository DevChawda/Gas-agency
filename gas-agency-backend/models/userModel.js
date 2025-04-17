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
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,  // Ensures the userId is unique
    default: () => generateUserId()  // Example of generating userId
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
  fullName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});

function generateUserId() {
  return 'user-' + Math.random().toString(36).substring(2, 15); // Example userId generation logic
}

module.exports = mongoose.model('User', userSchema);
