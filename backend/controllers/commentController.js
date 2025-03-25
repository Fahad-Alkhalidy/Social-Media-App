const CommentSchema = require("../models/commentModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const mongoose = require("mongoose");
exports.createComment = catchAsync(async (req, res, next) => {
  const comment = await CommentSchema.create({
    user: req.user,
    content: req.body.content,
    post: new mongoose.Types.ObjectId(req.body.postId),
  });
  console.log(comment);
  res.status(200).json({
    status: "success",
    data: comment,
  });
});

exports.getComments = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const comment = await CommentSchema.find({ post: postId }).populate({
    path: "post",
    select: "user",
  });
  res.status(200).json({
    status: "success",
    data: comment,
  });
});
