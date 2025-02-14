const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "unknown",
  },
  description: {
    type: String,
    default: "No description :(",
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Group must have an admin"],
  },
  privacy: {
    type: string,
    enum: ["Public", "Private"],
    default: "Public",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
