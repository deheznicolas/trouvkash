/* eslint-disable no-console */
const express = require("express");

const router = express.Router();

// Routes
router.get("/hello", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    res.send("Hello, World!");
});

router.get("/", (req, res) => {
    res.send("Hello, Posts!");
});

module.exports = router;
