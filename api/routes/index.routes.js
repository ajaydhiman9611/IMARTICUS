const apiv1 = require("express").Router();
const lectures = require("./lectures.routes")
const chapters = require("./chapters.routes")
const quizzes = require("./quizzes.routes")

apiv1.use("/lectures", lectures)
apiv1.use("/chapters", chapters)
apiv1.use("/quizzes", quizzes)

module.exports = apiv1;