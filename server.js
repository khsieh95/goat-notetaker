const express = require("express");
const path = require("path");

// express function and port
const app = express();
var PORT = process.env.PORT || 3000;

// data pasing, public folder connection
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// note data (DATA)
const savedNotes = [];
// routes CRUD post,get,put,delete
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// listen function
app.listen(PORT, function () {
  console.log("http://localhost:" + PORT);
});
