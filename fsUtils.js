const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 @param {string} destination 
 @param {object} content 
 @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
  @param {object} content 
  @param {string} file 
  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const deleteNote = (id, filePath, callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }

    let notes = JSON.parse(data);

   
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
    
      notes.splice(index, 1);

      
      fs.writeFile(filePath, JSON.stringify(notes), (err) => {
        if (err) {
          return callback(err);
        }

        callback(null);
      });
    } else {
      callback(null);
    }
  });
};


module.exports = { readFromFile, writeToFile, readAndAppend, deleteNote };
