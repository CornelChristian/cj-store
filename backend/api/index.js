import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import the CORS package
import { connectDB } from "../config/db.js";
import productRoutes from "../routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.NODE_ENV === "development" ? 5000 : process.env.PORT || 8080;

// Enable CORS for specific origins
app.use(cors({
  origin: ['http://localhost:5173', 'https://cj-store.vercel.app'], // Allow both local dev and production frontend origins
  methods: "GET, POST, PUT, DELETE", // Allowed HTTP methods
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Connect to the database
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export for serverless environments (optional)
export default (req, res) => {
  app(req, res); // Handle the incoming request using Express
};
