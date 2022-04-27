const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/Users");
const AppError = require("../utils/AppError");

//it will store the image in memory so that it is available later when sharping it is easily available
const multerStorage = multer.memoryStorage();

//allows us to check if user only uploads images and nothing else
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("The file is not an image. Please upload a image", 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.resizeUserPhoto = async (req, res, next) => {
  try {
    if (!req.file) return next();
    req.file.filename = `user-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`./public/uploads/${req.file.filename}`);
    next();
  } catch (err) {}
};

exports.uploadUserPhoto = upload.single("photo");

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

exports.updatePhoto = async (req, res, next) => {
  try {
    console.log(req.file);
    let filteredObj = { photo: "" };
    if (req.file) filteredObj.photo = req.file.filename;
    console.log(filteredObj, req.user);
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredObj,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ status: "success", updatedUser });
  } catch (err) {
    console.log(err);
  }
};

exports.addJoinedEvent = async (req, res, next) => {
  try {
    req.body = req.params.joinedEvents;
    let oldEvents = req.user.joinedEvents;
    req.body = oldEvents.push(req.body);
    console.log("hi", req.body);
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
      .select("joinedEvents")
      .populate({
        path: "joinedEvents",
        select: "-__v",
      });
    console.log(updatedUser);
    res.status(200).json({ status: "success", updatedUser });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    console.log(req.params.username);
    const deletedUser = await User.findOneAndDelete({
      username: req.params.username,
    });
    res.status(200).json({ status: "success", data: { deletedUser } });
  } catch (err) {
    console.log(err);
    res.status(401).json({ status: "failed", error: err });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ status: "success", data: { users } });
  } catch (err) {
    console.log(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );
    if (!user)
      return next(new AppError("the required user does not exist", 404));
    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(401).json({ status: "failed", error: err });
  }
};

exports.addAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user)
      return next(new AppError("the required user does not exist", 404));
    user.role = "admin";
    await user.save();
    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(401).json({ status: "failed", error: err });
  }
};
