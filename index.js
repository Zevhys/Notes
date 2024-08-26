const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

mongoose
  .connect("mongodb://localhost/notes")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB:", err));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

const notesRoutes = require("./routes/notes");

app.use("/notes", notesRoutes);

app.get("/", (req, res) => {
  res.redirect("/notes/add");
});

app.listen(5000, () => console.log("Server started on port 5000"));

app.use("/img", express.static(path.join(__dirname, "images")));

app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));

app.use("/css", express.static(path.join(__dirname, "node_modules/@fortawesome/fontawesome-free/css")));

app.use("/webfonts", express.static(path.join(__dirname, "node_modules/@fortawesome/fontawesome-free/webfonts")));

app.use((req, res) => {
  res.status(404).render("404");
});
