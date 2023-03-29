const notes = require("express").Router();
const fs = require("fs");
const notesDB = require("../db/db.json");

const {
  readFromFile,
  writeToFile,
  readAndAppend,
  readAndDelete,
} = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added!`);
  } else {
    res.error("Error in adding note");
  }
});

notes.delete("/:id", (req, res) => {
  if (req.params.id) {
    const toDelete = req.params.id;
    readAndDelete(toDelete, "./db/db.json");
    res.json(`Note deleted!`);
    return;
  } else {
    res.error("Error in deleting note");
  }
});

module.exports = notes;
