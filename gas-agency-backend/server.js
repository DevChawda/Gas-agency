import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminPanelRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use(express.json());
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/orders", orderRoutes);

app.use('/public', express.static(path.join(path.resolve(), 'public')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
});
