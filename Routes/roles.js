const { Router } = require('express');

const router = Router();

router.post("/api/roles/add", (req, res) => {
    res.json({ message: "Add role endpoint" });
});

module.exports = router;