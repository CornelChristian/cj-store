// api/products.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import productRoutes from "../routes/product.route.js";

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Connect to the database
connectDB();

export default (req, res) => {
  app(req, res); // Handle the incoming request using Express
};
