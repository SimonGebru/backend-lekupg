const express = require("express");
const app = express();

const bookRouter = require("./routes/books");
const userRouter = require("./routes/users");
const loanRouter = require("./routes/loans");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // 👈 byt till denna

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.json());


// 📚 Routes
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);
app.use("/api/loans", loanRouter);

// 🚀 Starta server
app.listen(3000, () => {
  console.log("Servern lyssnar på port 3000");
  console.log("Swagger Docs: http://localhost:3000/api-docs");
});
