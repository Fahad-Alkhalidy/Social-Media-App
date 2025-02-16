const mongoose = require("mongoose");

const repliesSchema = new mongoose.Schema({
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  content: {
    type: String,
    required: [true, "The Reply must contain a content"],
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

const Reply = mongoose.model("Post", repliesSchema);
module.exports = Reply;
