const express = require("express");
const Datastore = require("nedb");
const app = express();

// middleware för att kunna ta emot JSON- data i req-body

app.use(express.json());

// skapa nedb databas
const db = new Datastore({ filename: "books.db", autoload: true });

// POST anrop till nedb, lägg till bok till databasen
app.post("/books", (req, res) => {
  db.insert(req.body, (err, newDoc) => {
    if (err) {
      return res.status(500).json({ error: "något gick fel" });
    }

    res.json(newDoc);
  });
});

// GET anrop till nedb databas. Hämta alla böcker från databasen
app.get("/books", (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      return res.status(500).json({ error: "något gick fel med GET anropet" });
    }
    res.json(docs);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
