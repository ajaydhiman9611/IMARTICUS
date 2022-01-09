const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose")
const cors = require('cors');

let routes = require("./routes/index.routes")

mongoose
    .connect("mongodb+srv://root:admin@cluster0.vrg0v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to MongoDB!");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


// api endpoints ---------
app.use(cors());
app.use('/api', routes);


// listening to port and starting the server ----------
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})