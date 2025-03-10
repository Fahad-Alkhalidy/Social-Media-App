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
    select: false,
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
    default: "default.jpg",
  },
  coverPhoto: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
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
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordChangedAt: Date,
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

userSchema.methods.correctPassword = async function (
  userRealPassword,
  userEnteredPassword
) {
  try {
    return await bcrypt.compare(userEnteredPassword, userRealPassword);
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changeTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return changeTime > JWTTimeStamp;
  }
  //password did not change
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
