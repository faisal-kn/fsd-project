const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A username is required"],
    unique: [true, "A username should be unique"],
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
  joinedEvents: [{ type: mongoose.Schema.ObjectId, ref: "Event" }],
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

userSchema.index({ hobbies: 1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
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

userSchema.methods.generateToken = function () {
  const user = this;
  const token = sign({ _id: user._id.toHexString() }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  }).toString();
  user.tokens.push({ token });
  return user.save().then((us) => {
    return token;
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
