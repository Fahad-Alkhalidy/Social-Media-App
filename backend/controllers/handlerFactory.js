const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getOne = (Model, popOptions) => {
  catchAsync(async (req, res, next) => {
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
exports.getAll = (Model) => {
  catchAsync(async (req, res, next) => {
    const doc = Model.find();
    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        doc,
      },
    });
  });
};

exports.createOne = (Model) => {
  catchAsync(async (req, res, next) => {
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
  catchAsync(async (req, res, next) => {
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
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc)
      return next(AppError(`User with id ${req.params.id} is not found`, 400));
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};
