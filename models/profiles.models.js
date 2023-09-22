const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfile = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    tel: "string",
    city: "string",
    country: "string",
    address: "string",
    postalcode: "string",
    institution: "string",
    autre1: "string",
    grade: "string",
    autre2: "string",
    laboratoire: "string",
    ecoleDoctorale: "string",
    autre3: "string",
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("profiles", UserProfile);
