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

exports.resizeTourImages = async (req, res, next) => {
  try {
    if (!req.files.imageCover || !req.files.images) return next();
    const coverFileName = `tours-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`./public/img/tours/${coverFileName}`);

    req.body.imageCover = coverFileName;
    req.body.images = [];
    //now we need to process the images
    await Promise.all(
      req.files.images.map(async (image, i) => {
        const imageName = `tours-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
        await sharp(image.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`./public/img/tours/${imageName}`);
        req.body.images.push(imageName);
      })
    );
    next();
  } catch (err) {}
};

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
    let filteredObj;
    if (req.file) filteredObj.photo = req.file.filename;
    const updatedUser = await User.findByIdAndUpdate(
      req.CurrentUser._id,
      filteredObj,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ status: "success", updatedUser });
    next();
  } catch (err) {
    console.log(err);
  }
};
