const friendRequestModel = require("../models/friendReqestModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.createAFriendRequest = factory.createOne(friendRequestModel); //can create as many as he want /will modify it later/
exports.checkIfAvailableReqExist = catchAsync(async (req, res, next) => {
  const friendReq = await friendRequestModel.find({
    $and: [{ sender: req.sender }, { receiver: req.receiver }],
  });
  console.log(friendReq);
  if (friendReq.length !== 0)
    return next(new AppError("You have already sent a friend request before"));
  next();
});
exports.getFriendRequest = factory.getOne(friendRequestModel);
exports.getAllRequests = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  console.log(userId);
  console.log(req.params);
  const userRequests = await friendRequestModel
    .find({ receiver: userId })
    .populate({ path: "sender", select: "username profilePicture" })
    .populate({ path: "receiver", select: "username profilePicture" });
  res.status(200).json({
    status: "success",
    data: {
      userRequests,
    },
  });
});
