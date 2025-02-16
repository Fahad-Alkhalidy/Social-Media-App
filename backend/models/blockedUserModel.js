const mongoose = required("mongoose");

const blockedUserSchema = new mongoose.Schema({
  blocker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blocked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blockedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Block = mongoose.model("Block", blockedUserSchema);
module.exports = Block;
