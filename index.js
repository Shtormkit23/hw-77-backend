const express = require("express");
const posts = require("./app/posts");
const cors = require("cors");
const db = require("./fileDB");
const app = express();
const port = 8000;

db.init();

app.use(cors());
app.use(express.json());
app.use("/posts", posts);
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});