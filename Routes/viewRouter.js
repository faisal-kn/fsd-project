const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/login", viewController.getLogin);
router.get("/signup", viewController.getSignup);
router.get("/", viewController.getHome);
router.get("/events", authController.protect, viewController.getEvents);
router.get("/error", viewController.getErrorPage);
router.get("/contactus", viewController.getContactus);
router.get("/userprofile", viewController.getUserprofile);
router.get("/aboutus", viewController.getAboutus);
router.get("/eventsharing", viewController.getEventsharing);
router.get("/newTeam", viewController.getNewTeam);
module.exports = router;
