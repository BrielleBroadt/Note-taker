const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, deleteNote } = require('../fsUtils');

// GET Route for retrieving all the feedback
notes.get('/', (req, res) =>{
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post("/", (req, res) => {
  // Destructuring for items in req.body
  const { title, text } = req.body;
  // Check to see if new note has required elements
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
        status: 'success',
        body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error posting note')
  }
});

// Deleting a note from the page after clicking the trash icon
notes.delete('/:id', (req, res) => {
  const { id } = req.params;
  deleteNote (id, "./db/db.json", (err) => {
      if (err) {
        res.status(500).send("Error deleting note");
      } else {
        res.status(200).send("Successfully deleted note");
      }
    });

})

module.exports= notes;