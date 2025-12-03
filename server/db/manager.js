const { connect } = require("mongoose");
require("dotenv").config();

module.exports = connectDB = () => {
    connect(process.env.MONGO_DB).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
    });
}