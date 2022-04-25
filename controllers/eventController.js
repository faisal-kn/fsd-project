const Event = require("../models/Events");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

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

exports.uploadEvent = upload.single("photo");

exports.resizeEventPhoto = async (req, res, next) => {
  try {
    console.log("hi", req.file);
    if (!req.file) return next();
    req.file.filename = `event-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`./public/uploads/${req.file.filename}`);
    next();
  } catch (err) {}
};

exports.uploadEventPhoto = upload.single("photo");

exports.createEvent = async (req, res, next) => {
  try {
    req.body.location = [
      parseFloat(req.body.location[0]),
      parseFloat(req.body.location[1]),
    ];
    console.log(req.body);
    const newEvent = await Event.create(req.body);
    req.event = newEvent;
    return next();
  } catch (err) {
    res.status(401).json({ status: "failed", error: err });
  }
};

exports.getPopularEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({ status: "success", data: { events } });
  } catch (err) {
    res.status(401).json({ status: "failed", error: err });
  }
};

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({ status: "success", data: { events } });
  } catch (err) {
    exp;
    res.status(401).json({ status: "failed", error: err });
  }
};

exports.getEventByHobby = async (req, res, next) => {
  try {
    const eventByHobby = await Event.find({ hobby: req.params.hobby });
    res.status(200).json({ status: "success", data: { eventByHobby } });
  } catch (err) {
    res.status(401).json({ status: "failed", error: err });
  }
};

exports.uploadPhoto = async (req, res, next) => {
  try {
    console.log("hello", req.file);
    let filteredObj = { photo: "" };
    if (req.file) filteredObj.photo = req.file.filename;
    console.log(filteredObj, req.event);
    const newEvent = await Event.findByIdAndUpdate(req.event._id, filteredObj, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { newEvent } });
  } catch (err) {}
};
