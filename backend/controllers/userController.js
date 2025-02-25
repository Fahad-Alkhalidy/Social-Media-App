const multer = require("multer");
const User = require("../models/userModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const sharp = require("sharp");
const AppError = require("../utils/appError");

//File Uploading:
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    return next(
      new AppError("The file uploaded must only be an image!", 400),
      false
    );
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadUserPersonalPhoto = upload.single("profilePicture");
exports.resizeUserPersonalPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.fileName = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/image/users/${req.file.fileName}`);
  next();
});
//Filtering the req.body of the user when he tries to update:
const filterObj = (obj, ...fieldsUserCanUpdate) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (fieldsUserCanUpdate.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
//routes available for users:
exports.updateMe = async (req, res, next) => {
  //check if the user is trying to update his password from this path so an error gets thrown
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        "This route is not used to update password! Please use this route: /updateMyPassword",
        400
      )
    );
  }
  //filtering fields that are not allowed to be updated:
  const filterBody = filterObj(req.body, "username", "email");
  if (req.file) filterBody.profilePicture = req.file.fileName;
  //update user document:
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  //send a response:
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
};
//The user document can be only created using the /signup route (only)
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not defined, please use /signup",
  });
};
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
