const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/login", viewController.getLogin);
router.get("/signup", viewController.getSignup);
router.get("/", viewController.getHome);
router.get("/events", authController.protect, viewController.getEvents);
module.exports = router;