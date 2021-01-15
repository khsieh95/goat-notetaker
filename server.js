const express = require("express");
const path = require("path");
const fs = require("fs");
const { PassThrough } = require("stream");
const { v4: uuidv4 } = require("uuid");
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

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
      console.log(parseData);
      res.send(parseData);
    }
  });
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  note.id = uuidv4();
  console.log(note);
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

app.delete("/api/notes/:id", (req, res) => {
  const parameterId = req.params.id;
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("no error");
    }
    const newData = JSON.parse(data);
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === parameterId) {
        console.log(newData[i]);
        newData.splice(i, 1);

        const finalData = JSON.stringify(newData);
        fs.writeFile(
          path.join(__dirname, "db/db.json"),
          finalData,
          (err, data) => {
            if (err === true) {
              console.log(err);
            } else {
              console.log("no error");
              res.send("done");
            }
          }
        );
      }
    }
  });
});

// listen function
app.listen(PORT, function () {
  console.log("http://localhost:" + PORT);
});
