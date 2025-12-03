const { connect } = require("mongoose");
require("dotenv").config();

const connectDB = () => {
    connect(process.env.MONGO_DB).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = connectDB;