const express = require("express");
const app = express();

const bookRouter = require("./routes/books");
const userRouter = require("./routes/users");
const loanRouter = require("./routes/loans");

app.use(express.json());

app.use("/api/books", bookRouter);

app.use ("/api/users", userRouter);

app.use ("/api/loans", loanRouter);

app.listen(3000, () => {
  console.log("Servern lyssnar på port 3000");
});
