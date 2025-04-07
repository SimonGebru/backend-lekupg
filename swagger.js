const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Boklånssystem API",
      version: "1.0.0",
      description: "Automatiserad Swagger-dokumentation med JSDoc",
    },
  },
  apis: ["./routes/*.js"], // Här letar den efter JSDoc-kommentarer i alla route-filer
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;