const { Router } = require('express');

const router = Router();

const disheSchema = require("../db/schemas/dishes");

router.get("/api/dishes", async (req, res) => {
    const dishes = await disheSchema.find();
    res.status(200).json(dishes);
})

router.post("/api/dishes/add", async (req, res) => {
    try {
        const { name, description, price, author, ingredients } = req.body;
        if (!name || !description || !price || !author || !ingredients) {
            throw new Error("All fields are required");
        }

        if (price < 0) {
            throw new Error("Price must be a positive number");
        }

        if (ingredients.length < 1) {
            throw new Error("Ingredients must be at least one");
        }

        await new disheSchema({ name, description, price, author, ingredients }).save();

        res.status(200).json({ message: "Dish created successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

router.get("/api/dishes/:id", async (req, res) => {

    try {
        const { id } = req.params;

        const dish = await disheSchema.findById(id)
            .populate("author", "username")
            .populate("comments.author", "username")

        if (!dish) {
            throw new Error("Dish not found");
        }

        res.status(200).json(dish);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;