const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Quizzes = mongoose.model(
    "Quizzes",
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

module.exports = Quizzes;
