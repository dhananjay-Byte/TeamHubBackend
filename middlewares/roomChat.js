const Chat = require('../models/chat')

exports.fetchChat = async (req, res) => {
  try {
    const { roomid } = req.query;

    // Validate input parameters
    if (!sender || !receiver) {
      return res.status(400).json({ error: "Sender and receiver are required" });
    }

    // Fetch messages for the given room, sorted by timestamp
    const messages = await Chat.find({roomid}).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching chat messages:", err);
    res.status(500).json({ error: "Failed to fetch messages. Please try again later." });
  }
};
