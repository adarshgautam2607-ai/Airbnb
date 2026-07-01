const express = require("express");
const router = express.Router();

//Index
router.get("/posts", (req, res) => {
    res.send("Get for posts");
});

// Show
router.get("/posts/:id", (req, res) => {
    res.send("Get for post id");
});

//Post
router.post("/posts", (req, res) => {
    res.send("Post for posts");
});

//Delete
router.delete("/posts/:id", (req, res) => {
    res.send("Delete for post id");
});

module.exports = router;