const mongoose = require("mongoose");

const groupMemeberSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  role: {
    type: String,
    enum: ["Admin", "Moderator", "Member"],
    default: "Member",
  },
  joinedAt: {
    type: Date,
    default: Date.now(),
  },
});

const GroupMember = mongoose.model("GroupMember", groupMemeberSchema);
module.exports = GroupMember;
