import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import cors from "cors";
import cookieParser from "cookie-parser"; 

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 7000;

// CORS configuration
app.use(
  cors({
    origin: "https://paytm-frontend-gvlz.onrender.com", 
    credentials: true,
  })
);



// Middleware
app.use(express.json());
app.use(cookieParser()); 

// Database connection
connectDB()
  .then(() => {
    console.log("MongoDB connected......");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// Routes
import rootRouter from "./routes/index.js";
app.use("/api/v1", rootRouter);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Health Check Endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
