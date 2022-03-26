const User = require("../models/Users");

exports.getHobbies = async (req, res, next) => {
  try {
    const hobbies = await User.find({ _id: req.user._id }).select("hobbies");
    console.log(hobbies);
    res.status(200).json({ status: "success", data: { hobbies } });
  } catch (err) {
    console.log(err);
    res.status(401).json({ status: "failed", error: err });
  }
};
