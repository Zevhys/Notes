const express = require("express");
const router = express.Router();
const Note = require("../models/note.js");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");

const limitter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too Many Request, Try Again",
});

router.get("/add", (req, res) => {
  res.render("add");
});

router.get("/", limitter, async (req, res) => {
  const notes = await Note.find();
  res.render("index", { notes });
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  await note.save();
  res.redirect("/notes");
});

router.put("/:id", limitter, async (req, res) => {
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID Not Valid" });
  }

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: { title, content } },
    { new: true, runValidators: true }
  );

  if (!updatedNote) {
    return res.status(404).json({ error: "Notes Not Found" });
  }

  res.redirect("/notes");
});

router.delete("/:id", limitter, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.redirect("/notes");
});

module.exports = router;
