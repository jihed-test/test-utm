const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
    nom: "string",
    prenom: "string",
    email: {
      type: "string",
      trim: true,
      unique: true,
    },
    password: "string",
    code:"string",
    validate:"Boolean",
    role: "string",
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", UserModel);
