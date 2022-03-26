const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const { route } = require("./viewRouter");

const router = express.Router();

router.post(
  "/create-event",
  /*authController.protect,*/ eventController.createEvent
);
router.get("/popular-events", eventController.getPopularEvents);

module.exports = router;
