const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Backend_Dagcoin",
      version: "1.0.0",
      description:
        "API documentation for my holiday assignment named DagCoin backend",
      contact: {
        name: "Julius Gabriel Adebowale",
        email: "juadebgabriel@gmail.com",
      },
      servers: [
        {
          url: "http://localhost:3002",
          description: "Development server",
        },
      ],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  // Serve Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
