const express = require("express");
const fs = require("fs");           
const path = require("path");       

const router = express.Router();

const filePath = path.join(__dirname, "../data/users.json");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Hämta alla användare
 *     responses:
 *       200:
 *         description: Returnerar en lista med alla användare
 */
// Returnerar alla användare från users.json
router.get("/", (req, res) => {
  const data = fs.readFileSync(filePath, "utf8");   
  const users = JSON.parse(data);  // JS-array
  res.json(users);                                  
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Skapa en ny användare
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Simon"
 *             email: "simon@folkuniversitetet.se"
 *     responses:
 *       201:
 *         description: Användaren har skapats
 *       400:
 *         description: Namn och e-post är obligatoriska
 */
// Lägger till en ny användare i users.json
router.post("/", (req, res) => {
  const { name, email } = req.body; 

  if (!name || !email) {
    return res.status(400).json({ error: "Namn och e-post är obligatoriska" });
  }

  const data = fs.readFileSync(filePath, "utf8"); 
  const users = JSON.parse(data);

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser); 
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); 

  res.status(201).json(newUser); 
});

const loansPath = path.join(__dirname, '../data/loans.json');
const booksPath = path.join(__dirname, '../data/books.json');

/**
 * @swagger
 * /api/users/{id}/loans:
 *   get:
 *     summary: Hämta alla lån för en viss användare
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Användarens ID
 *     responses:
 *       200:
 *         description: Lista med användarens lån (inkl. boktitel och författare)
 *       404:
 *         description: Användare eller lån hittades inte
 */
// Visar lån för användare
router.get('/:id/loans', (req, res) => {
  const userId = parseInt(req.params.id); 

  const loans = JSON.parse(fs.readFileSync(loansPath, 'utf8')); 
  const books = JSON.parse(fs.readFileSync(booksPath, 'utf8')); 

  const userLoans = loans.filter(loan => loan.userId === userId);

  const detailedLoans = userLoans.map(loan => {
    const book = books.find(book => book.id === loan.bookId);
    return {
      ...loan,
      book: book ? { title: book.title, author: book.author } : null
    };
  });

  res.json(detailedLoans); 
});

module.exports = router;
