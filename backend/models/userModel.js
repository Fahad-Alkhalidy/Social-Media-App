const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
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
  passwordConfirm: {
    type: String,
    validate: {
      //only work on create or save
      validator: function (el) {
        return el === this.password;
      },
      message: "password does not match, try again!",
    },
  },
  fullname: {
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

userSchema.pre("save", async function (next) {
  //runs only when the password is modified:
  if (!this.isModified("password")) return next();
  //hash the password before saving it in the document:
  this.password = await bcrypt.hash(this.password, 12);
  //delete the passwordConfirm field:
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
