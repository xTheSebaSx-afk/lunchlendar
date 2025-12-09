const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    author: {
        ref: "users",
        required: true,
        type: Number
    },
    ingredients: {
        type: Array,
        required: true
    }
});

module.exports = model("dishes", schema);