const Events = require("../models/Events");

exports.getLogin = function (req, res, next) {
  res.status(200).render("pages/login", { title: "Login" });
};

exports.getHome = function (req, res, next) {
  res.status(200).render("pages/home", { title: "Home" });
};

exports.getSignup = function (req, res, next) {
  res.status(200).render("pages/signup", { title: "Signup" });
};

exports.getEvents = function (req, res, next) {
  res.status(200).render("pages/events", { title: "Events" });
};

exports.getErrorPage = function (req, res, next) {
  res.status(200).render("pages/errors", { title: "Error" });
};

exports.getContactus = function (req, res, next) {
  res.status(200).render("pages/contactus", { title: "Contactus" });
};

exports.getUserprofile = function (req, res, next) {
  res.status(200).render("pages/userprofile", { title: "Userprofile" });
};

exports.getAboutus = function (req, res, next) {
  res.status(200).render("pages/Aboutus", { title: "Aboutus" });
};

exports.getOneEvent = async function (req, res, next) {
  // console.log(req.params.eventid);
  const event = await Events.findOne({ _id: req.params.eventid });
  console.log(event);
  res.status(200).render("pages/eventsharing", {
    name,
    location,
    date,
    attendees,
    hobby,
    host,
    totalSpot,
    description,
  });
};

exports.getNewTeam = function (req, res, next) {
  res.status(200).render("pages/newTeam", { title: "NewTeam" });
};
