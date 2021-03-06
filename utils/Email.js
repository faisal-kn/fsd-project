const nodemailer = require("nodemailer");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("./AppError");

const mailServer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "faisal.khanmohd75@gmail.com",
    pass: "faisal002",
  },
});

exports.sendEmail = async (user, token) => {
  await User.findOne({ email: user.email }).then(async (user) => {
    if (!user) {
      throw new Error("User not found");
    }
    html =
      "<h2>Please click the link below to verify your email</h2>" +
      '<a href="http://localhost:3001/verify/' +
      token +
      '">Verify Here</a>';
    const mailOptions = {
      from: "khanmohdfaisal75@gmail.com",
      to: user.email,
      subject: "Please confirm your Email account",
      html: html,
    };
    mailServer.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
      }
    });
  });
};

exports.verifyEmail = async (token) => {
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(
        new AppError("The link is invalid or has expired. Please try again")
      );
    } else {
      user.status = "Active";
      user.save();
    }
  } catch (err) {
    console.log(err);
  }
};
