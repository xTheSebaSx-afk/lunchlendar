const { Router } = require('express');
const jwt = require('jsonwebtoken');

require("../managers/dbManagers/roles");

const users = require("../managers/dbManagers/users")

const router = Router();

router.post("/api/login", (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.getUser({ username });
        if (!user || user.password != password) {
            throw new Error("Invalid username or password");
        }
        
        const SECRET = "tokenSuperSecretNoOneKnowsItBcsItIsVeryLongAndSecretJAJAJAJ"
        
        const token = jwt.sign(user, SECRET);
        
        res.cookie("token", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,   // ahora JS puede leerla
            secure: true,
            sameSite: "none",
        });
        
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.post("/api/register", (req, res) => {

    const { username, password, email, role } = req.body;
    try {
        if (users.getUser({ username })) {
            throw new Error("User already exists");
        }
        if (!username || !password || !email || !role) {
            throw new Error("All fields are required");
        }

        users.addUser({ username, password, email, role });
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
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

module.exports = router;