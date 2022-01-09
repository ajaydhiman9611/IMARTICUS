const Chapters = require("../models/chapters.model");
const Lectures = require("../models/lectures.model");

const apiv1 = require("express").Router();

apiv1.get("/getAll", async (req, res) => {
    try {
        let data = await Chapters.find();
        console.log("????????? Data : ", data);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})

apiv1.post("/postOne", async (req, res) => {
    let chapters = new Chapters({
        title: "Neural Network and Deep Learning",
        description: "This is a chapter for Machine Learning!",
        lectures: [
            {
                title: "Application of Deep Learning",
                description: "This is a chapter for Machine Learning!",
            },
        ],
        quizzes: []
    })

    await chapters.save();
    res.json({ status: "Done!" })
})

module.exports = apiv1;