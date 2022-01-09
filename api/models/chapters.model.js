const mongoose = require("mongoose");
const Lectures = require("./lectures.model").schema;
const Quizzes = require("./quiz.model").schema;
var Schema = mongoose.Schema;

const Chapters = mongoose.model(
  "Chapters",
  new mongoose.Schema({
    title: {
      type: String,

    },
    description: {
      type: String
    },
    lectures: [Lectures],
    quizzes: [Quizzes]
  },
    { timestamps: true },
  )
);

module.exports = Chapters;
