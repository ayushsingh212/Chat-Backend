import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import allRoutes from "./routes/index.js"
import { setupSwagger } from "./utils/swagger.js";
const app = express();

// CORS configuration - FIXED
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://chat-frontend-b705.onrender.com",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);


// Body parsers
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Cookie parser
app.use(cookieParser());

// Routes
app.use("/api", allRoutes);

// Global error handler
app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    const statusCode: number = err.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
      errors: err.errors || [],
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
);
setupSwagger(app);

export default app;