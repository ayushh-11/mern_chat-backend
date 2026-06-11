const dotenv = require("dotenv");
dotenv.config(); // Load environment variables before app/socket setup

const { app, server } = require("./socket/socket");
const path = require("path")
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const connection = require("./db/connection");

// Middleware
app.use(express.json()); // For parsing JSON
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Session Configuration
app.use(session({
    name: 'app.sid',
    secret: "1234567890QWERTY", // Use environment variable
    resave: true,
    saveUninitialized: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/", userRoutes);

app.use(express.static(path.join("frontend/dist")))
/*
for production build, serve the static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
*/
// Start the Server
const port = process.env.PORT || 5000;
server.listen(port, () => {
    connection(); // Initialize DB connection
    console.log(`Server started on port ${port}`);
});
