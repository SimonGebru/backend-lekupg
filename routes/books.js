const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Sökväg till JSON-filen med alla böcker
const filePath = path.join(__dirname, '../data/books.json');


/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Hämta alla böcker eller filtrera efter författare
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filtrera på författarnamn
 *     responses:
 *       200:
 *         description: Lista med böcker (eventuellt filtrerad)
 */
// Exempel: /api/books?author=Rowling
router.get("/", (req, res) => {
  const data = fs.readFileSync(filePath, "utf8");
  const books = JSON.parse(data);

  const { author } = req.query;

  if (author) {
    const filtered = books.filter(b =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
    return res.json(filtered);
  }

  res.json(books);
});

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Lägg till en ny bok
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Metro 2033"
 *             author: "Dmitry Glukhovsky"
 *             genre: "Sci-Fi"
 *     responses:
 *       201:
 *         description: Boken har lagts till
 *       400:
 *         description: Fel i inmatningen
 */
// POST: Lägger till en ny bok
router.post("/", (req, res) => {
  const { title, author, genre } = req.body;

  // Säkerställer att alla fält är ifyllda
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


/**
 * @swagger
 * /api/books/bulk:
 *   post:
 *     summary: Lägg till flera böcker samtidigt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             - title: "Sagan om Ringen"
 *               author: "J.R.R. Tolkien"
 *               genre: "Fantasy"
 *             - title: "Cirkeln"
 *               author: "Mats Strandberg & Sara Elfgren"
 *               genre: "Urban Fantasy"
 *     responses:
 *       201:
 *         description: Flera böcker har lagts till
 *       400:
 *         description: Felaktig inmatning – ej array eller saknade fält
 */
// Exempel-body: [ {title: "...", author: "...", genre: "..."}, {...} ]
router.post("/bulk", (req, res) => {
  const booksToAdd = req.body;

  if (!Array.isArray(booksToAdd)) {
    return res.status(400).json({ message: "Skicka en array av böcker" });
  }

  const data = fs.readFileSync(filePath, "utf8");
  const books = JSON.parse(data);
  const startingId = books.length + 1;

  const newBooks = booksToAdd.map((book, index) => {
    const { title, author, genre } = book;
    if (!title || !author || !genre) return null;

    return {
      id: startingId + index,
      title,
      author,
      genre,
      available: true
    };
  }).filter(Boolean); // Ta bort eventuella null

  books.push(...newBooks);
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
  res.status(201).json(newBooks);
});

/**
 * @swagger
 * /api/books/borrowed:
 *   get:
 *     summary: Hämta alla utlånade böcker
 *     responses:
 *       200:
 *         description: Lista med böcker som är utlånade (available = false)
 */
// GET: Visar alla utlånade böcker
router.get('/borrowed', (req, res) => {
  const data = fs.readFileSync(filePath, "utf8");
  const books = JSON.parse(data);

  const borrowedBooks = books.filter(book => !book.available);
  res.json(borrowedBooks);
});

module.exports = router;
