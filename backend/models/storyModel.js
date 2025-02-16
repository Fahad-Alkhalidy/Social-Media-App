const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  media_url: {
    type: String,
  },
  expirationTime: {
    type: Date,
    default: Date.now() + 24 * 60 * 60 * 1000, // after 24 hours
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Story = mongoose.model("Story", StorySchema);
module.exports = Story;
