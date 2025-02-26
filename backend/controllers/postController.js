const factory = require("./handlerFactory");
const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
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
