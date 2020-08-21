const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema(
  {
    UserName: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userScheme);
module.exports = User;
