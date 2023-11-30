const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventProfile = new Schema(
  {
    user: "string",
    title: "string",
    comment: "string",
    date: "Date",
    createdAt:"Date",
    participation : "Boolean",
    j1:"Boolean",
    j2:"Boolean",
    j3:"Boolean",
    j4:"Boolean",
    j5:"Boolean",
    j6:"Boolean",
    j7:"Boolean"
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("events", EventProfile);
