const mongoose = require("mongoose");

const PageFollowersSchema = new mongoose.Schema({
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page",
    required: [true, "The page is a must to specifiy here"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The User is a must to specifiy here"],
  },
  followedAt: {
    type: Date,
    default: Date.now(),
  },
});

const PageFollower = mogoose.model("PageFollower", PageFollowersSchema);
module.exports = PageFollower;
