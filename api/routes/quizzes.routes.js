const apiv1 = require("express").Router();
const Types = require("mongoose").Types;
const Chapters = require("../models/chapters.model");


apiv1.get("/:id", async (req, res) => {
    try {
        let quizId = req.params.id.trim();
        console.log(`\n ====== In /quizzes/${req.params.id} =================== `)
        let { quizzes } = await Chapters.findOne({ "quizzes._id": Types.ObjectId(quizId) }, {
            quizzes: 1
        });

        if (quizzes.length > 0) {
            let sendData = {}
            for (let i = 0; i < quizzes.length; i++) {
                if (quizzes[i]._id.toString() === quizId) {
                    sendData = quizzes[i];
                    break;
                }
            }
            console.log(" ----- Data Found -----", sendData);
            console.log(`\n ====== End /quizzes/${req.params.id} =================== `)
            if (Object.keys(sendData).length > 0) res.status(200).send(sendData);
            else res.status(400).json({ message: "Undefined lecture id!" })
        } else res.status(400).json({ message: "Undefined lecture id!" })
    } catch (err) {
        console.log(err)
        console.log(`\n ====== End /quizzes/${req.params.id} =================== `)
        res.status(400).json({ message: "Something unusual happened!" });
    }
})
module.exports = apiv1;