const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reported: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reason: {
    type: String,
    enum: [
      "Sexual Event",
      "Assult",
      "Un Appropriate Content",
      "Fraud",
      "Others",
    ],
    default: "Others",
  },
  reportedAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved", "Rejected"],
    default: "Pending",
  },
  reporting: {
    type: String,
    enum: ["Comment", "User", "Post"],
    required: [true, "The Report must be about a (User, Comment or Post)"],
  },
});

const Report = mongoose.model("Report", ReportSchema);
module.exports = Report;
