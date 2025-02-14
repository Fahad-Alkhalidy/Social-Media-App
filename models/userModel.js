const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Every user must have a username"],
    unique: [true, "The username must be unique"],
  },
  email: {
    type: String,
    required: [true, "Every user must have an email"],
    unique: [true, "The email of the user must be unique"],
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  fullName: {
    type: String,
    required: [true, "The user must provide a fullName"],
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPhoto: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
