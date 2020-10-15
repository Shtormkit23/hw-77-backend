const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require("path");
const {nanoid} = require("nanoid");
const config = require("../config");
const db = require("../fileDB");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});


router.get("/", (req, res) => {
    const posts = db.getItems();
    res.send(posts);
});

router.post("/", upload.single("image"),
    (req, res) => {
        const post = req.body;
        if (req.file) {
            post.image = req.file.filename;
        }
        if (!req.body.name) {
            post.name = "Anonymous";
        }
        if (!req.body.message) {
            return res.status(400).send({"error": "You must fill in the message field"});
        }

        const response = db.addItem(post);
        res.send(response);
    });

module.exports = router;