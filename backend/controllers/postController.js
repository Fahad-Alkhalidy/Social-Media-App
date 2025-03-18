const factory = require("./handlerFactory");
const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
exports.createPost = factory.createOne(Post);
exports.getPost = factory.getOne(Post);

//helper functions like this must not contain catchAsync as it doesn't read anything from the request and
//it is not a middleware, also it doesn't send a response
const getAllFriendPosts = async (friendId) => {
  try {
    // Fetch posts for the given friendId
    const posts = await Post.find({
      user: friendId,
      visiblity: "Public",
    }).populate({
      path: "user",
      select: "username profilePicture",
    });
    return posts; // Return the posts array
  } catch (error) {
    console.error("Error fetching friend's posts:", error);
    return []; // Return empty array if an error occurs
  }
};

exports.getFriendUsersPosts = catchAsync(async (req, res, next) => {
  const userFriends = req.user.friends;

  // Fetch posts for all friends in parallel
  const allFriendPosts = await Promise.all(
    userFriends.map((friend) => getAllFriendPosts(friend.toString()))
  );

  console.log(allFriendPosts); // Debugging output

  // Flatten the array of arrays into a single array of posts
  const flattenedPosts = allFriendPosts.flat();

  res.status(200).json({
    status: "success",
    data: {
      friendPosts: flattenedPosts,
    },
  });
});

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

exports.filterCreatePost = catchAsync(async (req, res, next) => {
  console.log(req);
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

exports.getAllPosts = factory.getAll(Post);
