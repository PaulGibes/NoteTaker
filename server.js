const express = require("express");
const api = require("./routes");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/*", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
