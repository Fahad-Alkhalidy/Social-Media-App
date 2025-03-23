const CommentSchema = require("../models/commentModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
exports.createComment = factory.createOne(CommentSchema);
