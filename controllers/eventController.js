const Event = require("../models/Events");

exports.createEvent = async (req, res, next) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(200).json({ status: "success", data: { newEvent } });
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
    res.status(401).json({ status: "failed", error: err });
  }
};
