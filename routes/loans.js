const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const loansPath = path.join(__dirname, '../data/loans.json');
const usersPath = path.join(__dirname, '../data/users.json');
const booksPath = path.join(__dirname, '../data/books.json');

router.get ('/', (req, res) => {
    const data = fs.readFileSync(loansPath, 'utf8');
    const loans = JSON.parse(data);
    res.json(loans);
});

router.post('/', (req, res) => {
    const { userId, bookId } = req.body;
  
    // Säkerställ att båda finns
    if (!userId || !bookId) {
      return res.status(400).json({ error: 'userId och bookId krävs' });
    }
  
    // Konvertera till number om det råkat skickas som sträng
    const userIdNum = parseInt(userId);
    const bookIdNum = parseInt(bookId);
  
    // Läs in users och books
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
  
    console.log('Bokens tillgänglighet:', book.available);
  
    if (!book.available) {
      return res.status(400).json({ error: 'Boken är redan utlånad' });
    }
  

    // Läs befintliga lån
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
  
    // Uppdatera boken till "utlånad"
    book.available = false;
    fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
  
    res.status(201).json(newLoan);
  });
  router.patch ('/:id/return', (req, res) => {
    const loanId = parseInt (req.params.id);

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

    if (!book) {
        book.available = true;
        fs.writeFileSync (booksPath, JSON.stringify(books, null, 2));
    }
    fs.writeFileSync(loansPath, JSON.stringify(loans, null, 2));
    res.json({ message: 'Boken har återlämnats' });
});

module.exports = router;