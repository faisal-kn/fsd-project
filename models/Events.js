const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is required"],
  },
  location: {
    type: [Number],
    required: [true, "A location is required"],
  },
  date: {
    type: Date,
    required: [true, "A date is required"],
  },
  attendees: {
    type: Number,
    default: 0,
  },
  hobby: {
    type: String,
    required: [true, "A hobby is required"],
  },
  host: {
    type: String,
  },
  totalSpot: {
    type: Number,
    required: [true, "A total number of spots is required"],
  },
  likes: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: [true, "A description is required"],
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
