// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
// import transactionRoutes from "./routes/transactionRoutes.js";
import adminRoutes from "./routes/adminPanelRoutes.js"; // Import admin routes

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Connect to your MongoDB database

app.use("/api/users", userRoutes);
app.use("/api/enquiries", enquiryRoutes);
// app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes); // Mount admin routes under /api/admin

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));