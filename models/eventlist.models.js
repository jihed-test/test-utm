const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventListModel = new Schema(
  {
    title: "string",
    description: "string",
    date: "Date",
    numbreDays : "Number",
    participation : "Number",
    j1:"Number",
    j2:"Number",
    j3:"Number",
    j4:"Number",
    j5:"Number",
    j6:"Number",
    j7:"Number"
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("eventlist", EventListModel);
