const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "unknown",
  },
  description: {
    type: String,
    default: "No description specified :<",
  },
  category: {
    type: String,
    enum: [
      "Cooking",
      "Electronics",
      "Nature",
      "Education",
      "Political",
      "Others",
    ],
    default: "Others",
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Page must have an admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Page = mongoose.model("Page", PageSchema);
module.exports = Page;
