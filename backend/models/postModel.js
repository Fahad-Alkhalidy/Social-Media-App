const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    //required: [true, "The Post must have a user"],
  },
  content: {
    type: String,
    // required: [true, "The post must contain a message"],
  },
  media: {
    type: String,
  },
  hashtag: {
    type: String,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  shares: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  visiblity: {
    type: String,
    enum: ["Public", "Private", "Custom"],
    default: "Public",
  },
  updatedAt: {
    type: Date,
  },
});

const post = mongoose.model("Post", postSchema);
module.exports = post;
