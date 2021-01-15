const express = require("express");
const path = require("path");
const fs = require("fs");
const { PassThrough } = require("stream");

// express function and port
const app = express();
var PORT = process.env.PORT || 3000;

// data pasing, public folder connection
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// note data (DATA)
const savedNotes = [];

// HTML ROUTES
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// API ROUTES
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err === true) {
      console.log(err);
    } else {
      const parseData = JSON.parse(data);
      res.send(parseData);
    }
  });
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err === true) {
      console.log(err);
    } else {
      console.log("hi");

      const objectData = JSON.parse(data);
      const allNotes = [...objectData, note];
      const userData = JSON.stringify(allNotes);
      res.send(userData);
      fs.writeFile(path.join(__dirname, "db/db.json"), userData, (err, res) => {
        if (err === true) {
          console.log(err);
        } else {
          console.log("writing");
        }
      });
    }
  });
});
// listen function
app.listen(PORT, function () {
  console.log("http://localhost:" + PORT);
});
