const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const { route } = require("./viewRouter");

const router = express.Router();

router.post(
  "/create-event",
  authController.protect,
  eventController.createEvent
);
router.get("/popular-events", eventController.getPopularEvents);
router.get("/all-events", authController.protect, eventController.getAllEvents);
router.get(
  "/get-event-by-hobby/:hobby",
  authController.protect,
  eventController.getEventByHobby
);

module.exports = router;
