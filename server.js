require("dotenv").config({ path: "./config.env" })
const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose")
const cors = require('cors');
const path = require("path");

const connectDB = require("./db/config.db");
let routes = require("./routes/index.routes");

connectDB();

// api endpoints ---------
app.use(cors());
app.use('/api', routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../app/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(_dirname, '../app', 'build', 'index.html'))
    })
} else {
    app.get("/", (req, res) => {
        res.send("API Running!")
    })
}

// listening to port and starting the server ----------
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${port}!`)
})