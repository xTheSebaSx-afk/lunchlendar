const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"]
    }
});

module.exports = mongoose.model("users", schema);