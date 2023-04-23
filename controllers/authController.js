const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/AppError");
const Email = require("../utils/Email");

exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const cookieOptions = {
      expires: new Date(Date.now() + process.env.AUTH_COOKIE_EXPIRES_IN),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("auth", token, cookieOptions);
    res.status(200).json({
      status: "success",
      token,
      data: { newUser },
    });
    // const url = `${req.protocol}://${req.get("host")}/me#`;
    // console.log(url);
    // new Email(newUser, url).sendWelcome();
    await Email.sendEmail(newUser, token);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "failed",
      error: err,
    });
  }
};

exports.restrictTo = function (...allowed) {
  return function (req, res, next) {
    console.log(req.user);
    if (!allowed.includes(req.user.role)) {
      return next(new AppError("You do not have permission to do this.", 403));
    }
    req.user = req.user;
    next();
  };
};

exports.logout = (req, res) => {
  res.cookie("auth", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and Password not provided");
    }
    let user = await User.findOne({ email: email }).select("+password");
    if (!user || !(await user.checkPassword(password, user.password)))
      return next(new AppError("Incorrect email or password.", 401));
    if (user.status != "Active") {
      return res.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const cookieOptions = {
      expires: new Date(Date.now() + process.env.AUTH_COOKIE_EXPIRES_IN),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("auth", token, cookieOptions);

    //To remove the password field from the output ---------------------
    user = await User.findOne({ email: email });

    res.status(200).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "failed",
      error: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.auth) {
    token = req.cookies?.auth;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in . Please log in to get access", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError(
        "User belonging to this token has been deleted from our database",
        401
      )
    );
  req.user = user;
  res.locals.user = user;
  next();
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies?.auth) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.auth,
        process.env.JWT_SECRET
      );
      //CHECK IF USER EXISTS CURRENTLY.
      const user = await User.findById(decoded.id);
      if (!user) {
        res.locals.user = "";
        return next();
      }
      res.locals.user = user;
      return next();
    } catch (err) {
      res.locals.user = "";
      return next();
    }
  } else {
    res.locals.user = "";
  }
  next();
};
