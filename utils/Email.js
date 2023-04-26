const nodemailer = require("nodemailer");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("./AppError");

const mailServer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "faisal.khanmohd75@gmail.com",
    pass: "qyrsjpkjftlruxtd",
  },
});

exports.sendEmail = async (user, token) => {
  await User.findOne({ email: user.email }).then(async (user) => {
    if (!user) {
      throw new Error("User not found");
    }
    html =
      "<h2>Please click the link below to verify your email</h2>" +
      '<a href="https://incredible-boba-34c3a6.netlify.app/verify/' +
      token +
      '">Verify Here</a>';
    const mailOptions = {
      from: "faisalkhan.m20@iiits.in",
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
    console.log(decoded);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(
        new AppError("The link is invalid or has expired. Please try again")
      );
    } else {
      user.status = "Active";
      user.save();
      return 1;
    }
  } catch (err) {
    return 0;
  }
};
