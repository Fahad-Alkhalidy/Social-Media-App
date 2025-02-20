const User = require("../models/userModel");
const factory = require("./handlerFactory");

//The user document can be only created using the /signup route (only)
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not defined, please use /signup",
  });
};

exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
