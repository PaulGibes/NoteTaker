const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (desination, note) =>
  fs.writeFile(desination, JSON.stringify(note, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nNote saved to ${desination}`)
  );

const readAndAppend = (note, desination) => {
  fs.readFile(desination, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(note);
      writeToFile(desination, parsedData);
    }
  });
};

const readAndDelete = (id, desination) => {
  fs.readFile(desination, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      for (i = 0; i < parsedData.length; i++) {
        if (parsedData[i].id === id) {
          const deleteIndex = i;
          parsedData.splice(deleteIndex, 1);
          writeToFile(desination, parsedData);
          return;
        }
      }
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };
