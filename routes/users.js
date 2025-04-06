const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/users.json');

// GET: Hämta alla användare
router.get('/', (req, res) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(data);
  res.json(users);
});

// POST: Skapa en ny användare
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Namn och e-post är obligatoriska' });
  }

  const data = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(data);

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
});

module.exports = router;