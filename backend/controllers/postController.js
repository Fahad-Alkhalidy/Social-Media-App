const factory = require("./handlerFactory");
const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
exports.createPost = factory.createOne(Post);
exports.getPost = factory.getOne(Post);

exports.getAllUserPosts = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const userPosts = await Post.find({ user: userId }).populate({
    path: "user",
    select: "username profilePicture",
  });
  res.status(200).json({
    status: "success",
    data: {
      userPosts,
    },
  });
});

exports.createPost = factory.createOne(Post);

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
exports.uploadPostMedia = upload.single("media");
exports.resizePostMedia = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.fileName = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/image/users/${req.file.fileName}`);
  next();
});

exports.checkIfUserUploadedMedia = catchAsync(async (req, res, next) => {
  if (req.file) req.body.media = req.file.fileName;
  console.log(req);

  next();
});
