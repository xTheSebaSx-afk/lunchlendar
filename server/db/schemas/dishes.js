const { Schema, model } = require("mongoose");

const IngredientStruct = {
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
}

const StepStruct = {
    order: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}

const CommentStruct = {
    author: {
        ref: "users",
        required: true,
        type: Schema.Types.ObjectId
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}

const OpinionStruct = {
    author: {
        ref: "users",
        required: true,
        type: Schema.Types.ObjectId
    },
    type: {
        type: String,
        required: true,
        enum: ["like", "dislike"]
    }
}

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
        type: Schema.Types.ObjectId
    },
    ingredients: [IngredientStruct],
    steps: [StepStruct],
    comments: [CommentStruct],
    opinions: [OpinionStruct],
    date: {
        createdAt: {
            type: Date,
            required: true
        },
        updatedAt: {
            type: Date,
            required: true
        }
    }
});

module.exports = model("dishes", schema);