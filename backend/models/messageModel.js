const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The message must contain a sender user"],
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The message must contain a receiver user"],
    },
    content: {
      type: String,
      required: [true, "The message must contain a content"],
    },
    readByReceiver: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messagesSchema);
module.exports = Message;
