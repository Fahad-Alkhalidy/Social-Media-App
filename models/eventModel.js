const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Event must have a title"],
  },
  description: {
    type: String,
    required: [true, "Event must have a description"],
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  eventDate: {
    type: Date,
    required: [true, "Event must have a date"],
  },
  location: {
    type: String, // location here is a string maybe I will change it later
    required: [true, "Event must have a location"],
  },
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
