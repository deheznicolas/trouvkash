/* eslint-disable no-console */
const express = require("express");
const Post = require("../models/post");

const router = express.Router();

// Routes
router.get("/hello", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    res.send("Hello, World!");
});

// Get all data from DB
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
});

// Post data to DB
router.post("/", async (req, res) => {
    const post = new Post({
        country: req.body.country,
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;
