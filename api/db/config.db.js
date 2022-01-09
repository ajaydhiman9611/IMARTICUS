const mongoose = require("mongoose");

function connectDB() {
    mongoose
        .connect(process.env.MONGO_URI, {
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
}
module.exports = connectDB;