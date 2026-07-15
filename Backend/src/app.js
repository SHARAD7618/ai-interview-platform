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
    "http://localhost:3000",
    "https://ai-interview-platform-dyvqjfclt-sharad7618s-projects.vercel.app",
    "https://ai-interview-platform-enzny4dqh-sharad7618s-projects.vercel.app",
    "https://ai-interview-platform-qb2zyk5h8-sharad7618s-projects.vercel.app"
];

// CORS configuration to allow communication with the frontend
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) {
            callback(null, true);
            return;
        }

        const isAllowedOrigin = allowedOrigins.includes(origin) || /https:\/\/.*\.vercel\.app$/i.test(origin);

        if (isAllowedOrigin) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials: true,
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