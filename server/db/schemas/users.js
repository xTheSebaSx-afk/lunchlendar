const mongoose = require("mongoose");
const Counter = require("./usersCounter");

const schema = new mongoose.Schema({
    _id: Number,
    username: String,
    password: String,
    email: String,
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"]
    }
});

schema.pre("save", async function (next) {
    if (!this.isNew) return next();

    const counter = await Counter.findByIdAndUpdate(
        { _id: "users" },
        { $inc: { seq: 1 } },
        { upsert: true, new: true }
    );

    this._id = counter.seq;
    next();
});

module.exports = mongoose.model("users", schema);