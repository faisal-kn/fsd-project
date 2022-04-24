const User = require("../models/Users");
const AppError = require("../utils/AppError");

exports.getHobbies = async (req, res, next) => {
  try {
    const hobbies = await User.find({ _id: req.user._id }).select("hobbies");
    console.log(hobbies);
    res.status(200).json({ status: "success", data: { hobbies } });
  } catch (err) {
    console.log(err);
    res.status(401).json({ status: "failed", error: err });
  }
};

exports.changeUserName = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(updatedUser);
    if (!updatedUser) {
      return next(new AppError("the required user does not exist", 404));
    }
    res.status(200).json({ status: "success", data: { data: updatedUser } });
  } catch (err) {
    res.status(401).json({ status: "failed", error: err });
  }
};

exports.changePersonalInformation = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(updatedUser);
    if (!updatedUser) {
      return next(new AppError("the required user does not exist", 404));
    }
    res.status(200).json({ status: "success", data: { data: updatedUser } });
  } catch (err) {
    res.status(401).json({ status: "failed", error: err });
  }
};
