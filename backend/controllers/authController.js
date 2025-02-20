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

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //check if user entered both the username and password (backend check):
  if (!email || !password)
    return next(
      new AppError("You must provide both your email and password", 400)
    );
  //check if the user exist:
  const user = await User.findOne({ email }).select("+password");
  console.log(user.password, password);
  if (!user || !(await user.correctPassword(user.password, password)))
    return next(new AppError("Email or password is not correct!", 401));
  //create a token if everything went seccessful
  createSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() * 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //get the token from the header or the cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  //check if logged in or not
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  //verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if the user with this token exist:
  const user = await User.findById(decoded.userId);
  if (!user)
    return next(
      new AppError(
        "The user belonging to this token does no longer exist!",
        401
      )
    );
  //check if the user changed the password after the token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "The user belonging to this token has recently changed his password, Please login again!",
        401
      )
    );
  }
  //give access to the user:
  req.user = user;
  res.locals.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new AppError("You are restricted from accessing this endpoint", 403)
      );
    }
    next();
  };
};
