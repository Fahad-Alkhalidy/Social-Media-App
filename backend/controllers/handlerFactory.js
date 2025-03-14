const User = require("../models/userModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getOne = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query.populate(popOptions);
    const doc = await query;
    if (!doc)
      return next(
        new AppError(`User with id: ${req.params.id} is not found!`, 400)
      );
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
};

//did not complete yet, I will update it later after adding features to the API
exports.getAll = (Model, execlude) => {
  return catchAsync(async (req, res, next) => {
    let filter = {};
    const execludedId = req.user._id.toString();
    if (execlude) {
      filter["_id"] = { $ne: execludedId };
    }
    //I will create a nested get later on for some collections
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;
    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });
};

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    //console.log(req);
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc)
      return next(AppError(`User with id: ${req.params.id} is not found`, 400));
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
};

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc)
      return next(AppError(`User with id ${req.params.id} is not found`, 400));
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};
