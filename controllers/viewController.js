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

exports.getEventsharing = function (req, res, next) {
  res.status(200).render("pages/eventsharing", { title: "Eventsharing" });
};

exports.getNewTeam = function (req, res, next) {
  res.status(200).render("pages/newTeam", { title: "NewTeam" });
};
