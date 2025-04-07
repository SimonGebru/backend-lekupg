const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Sökvägar till våra JSON-filer
const loansPath = path.join(__dirname, '../data/loans.json');
const usersPath = path.join(__dirname, '../data/users.json');
const booksPath = path.join(__dirname, '../data/books.json');

/**
 * @swagger
 * /api/loans:
 *   get:
 *     summary: Hämta alla lån
 *     responses:
 *       200:
 *         description: Lista med alla lån
 */
// Returnerar alla lån
router.get('/', (req, res) => {
  const data = fs.readFileSync(loansPath, 'utf8');
  const loans = JSON.parse(data);
  res.json(loans);
});

/**
 * @swagger
 * /api/loans:
 *   post:
 *     summary: Skapa ett nytt lån (låna en bok)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 1
 *             bookId: 3
 *     responses:
 *       201:
 *         description: Lånet skapades
 *       400:
 *         description: Ogiltig data eller boken är redan utlånad
 *       404:
 *         description: Användare eller bok hittades inte
 */
// Skapar ett nytt lån
router.post('/', (req, res) => {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
    return res.status(400).json({ error: 'userId och bookId krävs' });
  }

  const userIdNum = parseInt(userId);
  const bookIdNum = parseInt(bookId);

  const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

  const user = users.find(u => u.id === userIdNum);
  const book = books.find(b => b.id === bookIdNum);

  if (!user) {
    return res.status(404).json({ error: 'Användare hittades inte' });
  }

  if (!book) {
    return res.status(404).json({ error: 'Bok hittades inte' });
  }

  if (!book.available) {
    return res.status(400).json({ error: 'Boken är redan utlånad' });
  }

  const loans = JSON.parse(fs.readFileSync(loansPath, 'utf8'));

  const newLoan = {
    id: loans.length + 1,
    userId: userIdNum,
    bookId: bookIdNum,
    loanDate: new Date().toISOString(),
    returned: false
  };

  loans.push(newLoan);
  fs.writeFileSync(loansPath, JSON.stringify(loans, null, 2));

  book.available = false;
  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));

  res.status(201).json(newLoan);
});

/**
 * @swagger
 * /api/loans/{id}/return:
 *   patch:
 *     summary: Återlämna en bok
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Låne-ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Boken har återlämnats
 *       400:
 *         description: Boken var redan återlämnad
 *       404:
 *         description: Lån hittades inte
 */
// Återlämna en bok
router.patch('/:id/return', (req, res) => {
  const loanId = parseInt(req.params.id);

  const loans = JSON.parse(fs.readFileSync(loansPath, 'utf8'));
  const loan = loans.find(l => l.id === loanId);

  if (!loan) {
    return res.status(404).json({ error: 'Lån hittades inte' });
  }

  if (loan.returned) {
    return res.status(400).json({ error: 'Boken är redan återlämnad' });
  }

  loan.returned = true;

  const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));
  const book = books.find(b => b.id === loan.bookId);

  if (book) {
    book.available = true;
    fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
  }

  fs.writeFileSync(loansPath, JSON.stringify(loans, null, 2));
  res.json({ message: 'Boken har återlämnats' });
});

module.exports = router;