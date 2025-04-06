const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, '../data/books.json');

router.get("/", (req, res) => {
  const data = fs.readFileSync(filePath, "utf8");
  const books = JSON.parse(data);
  res.json(books);
});

router.post("/", (req, res) => {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res.status(400).json({ message: "Alla dessa fält behövs" });
  }
  const data = fs.readFileSync(filePath, "utf8");
  const books = JSON.parse(data);

  const newBook = {
    id: books.length + 1,
    title,
    author,
    genre,
    available: true,
  };

  books.push(newBook);
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
  res.status(201).json(newBook);
});

module.exports = router;
