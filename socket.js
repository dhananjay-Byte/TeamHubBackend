const Chat = require("./models/chat");
const socketIo = require("socket.io");

let io;

// Initialize Socket.io
const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin:'http://localhost:3002',
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", handleConnection);
  return io;
};

// Handle new socket connections
const handleConnection = (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinRoom", ({ user, roomid }) => joinRoom(socket, user, roomid));
  socket.on("sendMessage", async (data) => await sendMessage(socket, data));
  socket.on("leaveRoom", ({ user, roomid }) => leaveRoom(socket, user, roomid)); // Handle leaving
  socket.on("disconnect", () => handleDisconnect(socket));
};


// Join a unique room based on sender and receiver IDs
const joinRoom = (socket, user, roomid) => {
  socket.join(roomid);
  io.to(roomid).emit("userJoined",user);
  console.log(`${user} socket id ${socket.id} joined room: ${roomid}`);
};

const leaveRoom = (socket, user, roomid) => {
  console.log(`${user} left room: ${roomid}`);
  socket.leave(roomid);
  io.to(roomid).emit("userLeft", { user, message: `${user} has left the chat.` });
};

// Send and store messages
const sendMessage = async (socket, { user, roomName,roomid, message }) => {

  console.log(`send message socket on room: ${roomid}`,user,message)

  if (!message.trim()) {
    return socket.emit("errorMessage", { error: "Message cannot be empty" });
  }

  try {
    const newMessage = new Chat({ user,roomid,message, roomName });
    await newMessage.save();
    io.to(roomid).emit("receiveMessage", newMessage);
    socket.emit("messageSent", { success: true, message: newMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    socket.emit("errorMessage", { error: "Message sending failed" });
  }
};

// Handle user disconnection
const handleDisconnect = (socket) => {
  console.log(`User disconnected: ${socket.id}`);
  socket.rooms.forEach((room) => socket.leave(room));


};


// Get the Socket.io instance
const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initializeSocket, getIo };