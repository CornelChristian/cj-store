import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "../config/db.js";
import productRoutes from "../routes/product.route.js";

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Serve frontend files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Connect to the database
connectDB();

// For local development (use app.listen instead of createServer)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
