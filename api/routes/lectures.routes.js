const apiv1 = require("express").Router();
const Types = require("mongoose").Types;
const Chapters = require("../models/chapters.model");


apiv1.get("/:id", async (req, res) => {
    try {
        let lectureId = req.params.id.trim();
        console.log(`\n ====== In /lectures/${req.params.id} =================== `)

        let { lectures } = await Chapters.findOne({ "lectures._id": Types.ObjectId(lectureId) }, {
            lectures: 1
        });
        console.log(`Data : ${lectures}`)

        if (lectures.length > 0) {
            let sendData = {}
            for (let i = 0; i < lectures.length; i++) {
                if (lectures[i]._id.toString() === lectureId) {
                    sendData = lectures[i];
                    break;
                }
            }
            console.log(" ----- Data Found -----", sendData);
            console.log(`\n ====== End /lectures/${req.params.id} =================== `)
            if (Object.keys(sendData).length > 0) res.status(200).send(sendData);
            else res.status(400).json({ message: "Undefined lecture id!" })
        } else res.status(400).json({ message: "Undefined lecture id!" })
    } catch (err) {
        console.log(err)
        console.log(`\n ====== End /lectures/${req.params.id} =================== `)
        res.status(400).json({ message: "Something unusual happened!" });
    }
})
module.exports = apiv1;