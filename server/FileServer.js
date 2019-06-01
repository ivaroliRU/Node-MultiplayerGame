const express = require('express');
const path = require('path');
const app = express();

var files = path.normalize("./client");

app.use('/', express.static(files));

app.get("/", (req, res) => {
    res.status(200).sendfile("index.html", {root: files});
});

module.exports = app;