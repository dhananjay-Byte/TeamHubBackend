const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const http = require("http");
const { initializeSocket, getIo } = require("./socket");
require("dotenv").config();


const authRoutes = require("./routes/authRoute");
const loginRoutes = require("./routes/loginRoute");
const emailRoutes = require("./routes/emailRoute");
const taskRoutes = require("./routes/taskRoute");
const chatRoutes = require("./routes/chatRoute");
const verifyToken = require("./middlewares/verifyToken");

const app = express();
const server = http.createServer(app);

const chatURL = process.env.CHAT_APP_URL
const emailURL = process.env.EMAIL_APP_URL
const hostURL = process.env.HOST_APP_URL
app.use(
  cors({
    origin: [hostURL, emailURL, chatURL],
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


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to the database!"))
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1); 
  });

  app.get("/v1/api/auth/me", verifyToken, (req, res) => {
    res.json({ user: req.user });
  });
  
app.get("/v1/api/chats/socket", (req, res) => {
  try {

    if (!getIo()) {
      initializeSocket(server);
      console.log("Socket initialized on demand!");
    } else {
      console.log("Socket already initialized.");
    }
    res.status(200).json({ message: "Socket initialized successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to initialize socket" });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});