const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

var server = app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.close = () => {
    server.close();
    console.log("Server closed");
};

module.exports = app;