const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A username is required"],
  },
  email: {
    type: String,
    required: [true, "A email is required"],
    unique: [true, "This email address already exists in our database ."],
    lowercase: true,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm the password"],
    validate: {
      validator: function (pass) {
        return this.password === pass;
      },
      message: "Password do not match .Please enter again",
    },
  },
  passwordCreatedAt: {
    type: Date,
    default: Date.now(),
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  friends: {
    type: [String],
    default: [],
  },
  hobbies: {
    type: [String],
    enum: [
      "Educational",
      "Games",
      "coding meetups",
      "Mixers",
      "political gatherings",
      "Major events",
      "Friend meetups",
      "Travelling",
      "Random meetups",
      "Hangouts",
    ],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
