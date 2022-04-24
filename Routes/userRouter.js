const { Router } = require("express");
const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/hobbies", authController.protect, userController.getHobbies);
router.patch(
  "/changeusername",
  authController.protect,
  userController.changeUserName
);

module.exports = router;
