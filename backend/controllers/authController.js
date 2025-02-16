const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 //cookie expires after 90 days
    ),
    httpOnly: true, //cookie is not accessible via js
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined; //password must not be send as a response
  res.status(statusCode).json({
    status: "success",
    token: token,
    data: { user },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const {
    username,
    email,
    fullname,
    password,
    passwordConfirm,
    profilePicture,
    coverPhoto,
    bio,
  } = req.body;
  //validating the input (can be done in the schema):
  if (!username || !email || !password || !passwordConfirm || !fullname)
    return next(
      new AppError(
        "You must provide all required fields: (username, email, password, passwordConfirm, fullname)",
        400
      )
    );
  //validating if the user already exist:
  const checkExistingUserByEmail = await User.findOne({ email });

  if (checkExistingUserByEmail)
    return next(
      new AppError(
        "The email you used is already registered in the system, try to login!",
        400
      )
    );
  //validating if the username is being used by other user:
  const checkExistingusername = await User.findOne({ username });
  if (checkExistingusername)
    return next(
      new AppError(
        "Your current username is being used by another user, try another one!"
      ),
      400
    );

  const newUser = await User.create({
    username,
    email,
    password,
    fullname,
    profilePicture,
    coverPhoto,
    bio,
  });
  createSendToken(newUser, 201, res);
});
