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
    },
    comments: [{
        author: {
            ref: "users",
            required: true,
            type: Number
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }],
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
});

module.exports = model("dishes", schema);