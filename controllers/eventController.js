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
    console.log(req.file);
    if (!req.file) return next();
    req.file.filename = `event-${Date.now()}.jpeg`;
    console.log(req.file.filename);
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`../mapty-react/public/upload/${req.file.filename}`);
    next();
  } catch (err) {}
};

exports.uploadEventPhoto = upload.single("photo");

exports.createEvent = async (req, res, next) => {
  try {
    let news = req.body.location.split(",");
    news[0] = parseFloat(news[0]);
    news[1] = parseFloat(news[1]);
    req.body.location = news;
    req.body.host = req.user._id;

    const newEvent = await Event.create(req.body);
    req.event = newEvent;
    return next();
  } catch (err) {
    console.log(err);
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
    let filteredObj = { photo: "" };
    if (req.file) filteredObj.photo = req.file.filename;
    const newEvent = await Event.findByIdAndUpdate(req.event._id, filteredObj, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { newEvent } });
  } catch (err) {}
};

exports.getEventsOfHost = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const eventsOfHost = await Event.find({ host: req.user._id });
    console.log(eventsOfHost);
    res.status(200).json({ status: "success", data: { eventsOfHost } });
  } catch (err) {
    res.status(401).json({ status: "failed", error: err });
  }
};

exports.eventDelete = async (req, res, next) => {
  try {
    console.log(req.params.eventName);
    const event = await Event.findOneAndDelete({ name: req.params.eventName });
    res.status(200).json({ status: "success", data: { event } });
  } catch (err) {
    res.status(401).json({ status: "failed", error: err });
  }
};

exports.getOneEvent = async (req, res, next) => {
  try {
    const event = await Event.findOne({ _id: req.params.eventid }).populate({
      path: "host",
      select: "-__v -passwordCreatedAt",
    });
    res.status(200).json({
      status: "success",
      data: {
        event,
      },
    });
  } catch (err) {
    res.status(401).json({ status: "failed", error: err.message });
  }
};
