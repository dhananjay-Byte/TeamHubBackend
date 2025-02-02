const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const http = require("http");
const { initializeSocket } = require("./socket");
require("dotenv").config();

// Importing Routes
const authRoutes = require("./routes/authRoute");
const loginRoutes = require("./routes/loginRoute");
const emailRoutes = require("./routes/emailRoute");
const taskRoutes = require("./routes/taskRoute");
const chatRoutes = require("./routes/chatRoute");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/login", loginRoutes);
app.use("/v1/api/mail", emailRoutes);
app.use("/v1/api/task", taskRoutes);
app.use("/v1/api/chats", chatRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to the database!"))
  .catch((err) => {
    console.error("❌ Error connecting to database:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// Initialize Socket.io
initializeSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
