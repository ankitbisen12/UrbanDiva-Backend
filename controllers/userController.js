const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { userData } = require("../utils/common");

exports.fetchUserById = catchAsync(async (req, res) => {
  //extracting id from backend only
  console.log("req.user",req.user);
  const { id } = req.user;
  const user = await User.findById(id);
  res.status(200).json(userData(user));
});

exports.updateUser = catchAsync(async (req, res, next) => {
  //extracting id from request.
  const { id } = req.params;
  console.log("req.body", req.body);
  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});
