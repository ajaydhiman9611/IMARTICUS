const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Lectures = mongoose.model(
  "Lectures",
  new mongoose.Schema({
    title: {
      type: String,

    },
    description: {
      type: String
    },
  },
    { timestamps: true },
  )
);

module.exports = Lectures;
