const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventProfile = new Schema(
  {
    user: "string",
    title: "string",
    comment: "string",
    date: "Date",
    createdAt:"Date",
    participation : "Boolean"
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("events", EventProfile);
