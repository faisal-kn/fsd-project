const multer = require("multer");
const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

const upload = multer({ dest: "public/uploads" });
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/allUsers", userController.getAllUsers);
router.get("/hobbies", authController.protect, userController.getHobbies);
router.patch(
  "/changeusername",
  authController.protect,
  userController.changeUserName
);
router.patch(
  "/updatePhoto",
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updatePhoto
);

router.patch(
  "/add-joined-event/:joinedEvents",
  authController.protect,
  userController.addJoinedEvent
);

router.delete(
  "deleteUser/:id",
  authController.protect,
  authController.restrictTo("admin"),
  userController.deleteUser
);

module.exports = router;
