const mongoose = require("mongoose");

const friendRequestSchmea = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Req must have a sender!"],
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Req must have a receiver!"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
    required: [true, "The request must have a status"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

friendRequestSchmea.pre(/^find/, function (next) {
  this.populate({
    path: "sender",
    select: "username profilePicture",
  }).populate({
    path: "receiver",
    select: "username profilePicture",
  });
  next();
});

const friendRequest = mongoose.model("FriendRequest", friendRequestSchmea);
module.exports = friendRequest;
