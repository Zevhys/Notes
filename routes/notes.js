const express = require("express");
const router = express.Router();
const Note = require("../models/note.js");

router.get("/add", (req, res) => {
  res.render("add");
});

router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.render("index", { notes });
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  await note.save();
  res.redirect("/notes");
});

router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, content });
  res.redirect("/notes");
});

router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.redirect("/notes");
});

module.exports = router;
