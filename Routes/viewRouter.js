const express = require("express");
const viewController = require("../controllers/viewController");
const router = express.Router();

router.get("/login", viewController.getLogin);
router.get("/signup", viewController.getSignup);
router.get("/", viewController.getHome);
router.get("/events", viewController.getEvents);

router.get("/errors",viewController.getErrors);

module.exports = router;
