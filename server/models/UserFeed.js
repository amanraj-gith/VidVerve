const mongoose = require("mongoose");

const userFeedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  videoId: String,
  tags: [String]  // Array of tag strings
});
