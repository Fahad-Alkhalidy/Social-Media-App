const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  typeOfNotification: {
    type: String,
    enum: ["FriendRequest", "Like", "Comment", "Message"],
    required: [true, "The notification must contain a type"],
  },
  content: {
    type: String,
    required: [true, "The notification must contain a content"],
  },
  readStatus: {
    type: boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
