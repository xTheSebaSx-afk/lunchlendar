const { Router } = require('express');
const jwt = require('jsonwebtoken');

const users = require("../db/schemas/users")

const router = Router();

router.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await users.findOne({ username });

        if (!user || user.password != password) {
            throw new Error("Invalid username or password");
        }

        const SECRET = "tokenSuperSecretNoOneKnowsItBcsItIsVeryLongAndSecretJAJAJAJ"

        const { password: pass, ...userWithoutPassword } = user.toObject();

        const token = jwt.sign(userWithoutPassword, SECRET);

        res.cookie("token", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "none",
        });

        res.json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.post("/api/register", async (req, res) => {
    const { username, password, email, role } = req.body;
    try {
        const userFinded = await users.findOne({ username });
        if (userFinded) {
            throw new Error("User already exists");
        }
        if (!username || !password || !email || !role) {
            throw new Error("All fields are required");
        }

        await new users({ username, password, email, role }).save();

        res.json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.get("/api/me", (req, res) => {
    const token = req.cookies?.token;
    const SECRET = "tokenSuperSecretNoOneKnowsItBcsItIsVeryLongAndSecretJAJAJAJ";

    if (!token)
        return res.status(401).json({ error: "Not authenticated" });

    try {
        const decoded = jwt.verify(token, SECRET);
        res.json(decoded);

    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
});

router.post("/api/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "none"
    });
    res.json({ message: "Logged out successfully" });
});

module.exports = router;