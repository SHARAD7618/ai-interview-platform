const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// List of allowed origins for CORS
const allowedOrigins = [
    "http://localhost:5173", 
    "https://ai-interview-platform-dyvqjfclt-sharad7618s-projects.vercel.app",
    "https://ai-interview-platform-enzny4dqh-sharad7618s-projects.vercel.app" // Added the new Vercel URL
];

// CORS configuration to allow communication with the frontend
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin or from allowed origins
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Enable cookies/sessions
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

/* Import routes */
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

/* Use routes */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;