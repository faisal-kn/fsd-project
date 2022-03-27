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

exports.getErrors = function (req, res, next) {
  res.status(200).render("pages/errors", { title: "Errors" });
};
