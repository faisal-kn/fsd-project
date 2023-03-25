const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/create-event",
  authController.protect,
  eventController.uploadEvent,
  eventController.createEvent,
  eventController.resizeEventPhoto,
  eventController.uploadPhoto
);

router.get("/popular-events", eventController.getPopularEvents);
router.get("/all-events", authController.protect, eventController.getAllEvents);

router.get(
  "/one-event/:eventid",
  authController.protect,
  eventController.getOneEvent
);

router.get(
  "/get-event-by-hobby/:hobby",
  authController.protect,
  eventController.getEventByHobby
);

router.get(
  "/get-events-of-host/",
  authController.protect,
  eventController.getEventsOfHost
);

router.delete(
  "/deleteEvent/:eventName",
  authController.protect,
  authController.restrictTo("admin"),
  eventController.eventDelete
);

module.exports = router;
