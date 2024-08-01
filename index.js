const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost/notes")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB:", err));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.use(express.static("public"));

const notesRoutes = require("./routes/notes");

app.use("/notes", notesRoutes);

app.get("/", (req, res) => {
  res.redirect("/notes/add");
});

app.listen(3000, () => console.log("Server started on port 3000"));
