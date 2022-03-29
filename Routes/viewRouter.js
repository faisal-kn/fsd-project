const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/login", viewController.getLogin);
router.get("/signup", viewController.getSignup);
router.get("/", viewController.getHome);
router.get("/events", authController.protect, viewController.getEvents);
router.get("/error", viewController.getErrorPage);
router.get("/contactus", viewController.getContactus);
router.get("/userprofile", viewController.getUserprofile);
router.get("/aboutus", viewController.getAboutus);
router.get("/teams", viewController.getNewTeam);
router.get("/events/:eventid", viewController.getOneEvent);
router.get("/adminportal", viewController.getAdminportal);

module.exports = router;
