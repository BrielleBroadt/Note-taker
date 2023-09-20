const express = require("express");
const path = require("path");
const api = require("./routes/index.js");

// Assign PORT variable for heroku port otherwise run on 3001
const PORT = process.env.PORT || 3001;
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

// GET route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Get route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Adding wildcard route to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Listen for the port
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});