const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventListModel = new Schema(
  {
    title: "string",
    description: "string",
    date: "Date",
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("eventlist", EventListModel);
