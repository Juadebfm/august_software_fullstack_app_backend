# Swagger Setup Guide

This guide provides step-by-step instructions for setting up Swagger to document your Node.js API. Swagger allows you to create interactive and standardized API documentation.

---

## Prerequisites

- Node.js installed on your machine.
- An existing Node.js application with Express.

---

## Step 1: Install Swagger Dependencies

Install the necessary packages for Swagger:

```bash
npm install swagger-jsdoc swagger-ui-express
```

## Step 2: Create a Swagger Configuration File

Create a new file config/swagger.js to define your Swagger configuration:

```js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation for your backend application",
      contact: {
        name: "Your Name",
        email: "your.email@example.com",
      },
      servers: [
        {
          url: "http://localhost:3001",
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
  apis: ["./routes/*.js"], // Path to your API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  // Serve Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
```

## Step 3: Add Swagger Annotations to Your Routes

Add JSDoc-style comments to your route handlers to describe the API endpoints. For example, update routes/authRoutes.js:

```js
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - phone
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: password123
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully!
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f1b2c8e4b0f5a3d4f5e6a7
 *                     username:
 *                       type: string
 *                       example: john_doe
 *                     phone:
 *                       type: string
 *                       example: 1234567890
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *       400:
 *         description: Invalid input or user already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful!
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f1b2c8e4b0f5a3d4f5e6a7
 *                     username:
 *                       type: string
 *                       example: john_doe
 *                     phone:
 *                       type: string
 *                       example: 1234567890
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Server error
 */
router.post("/signup", signupValidationRules, validate, signup);
router.post("/login", loginValidationRules, validate, login);
```

## Step 4: Initialize Swagger in Your App

Update index.js to initialize Swagger:

```js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerSetup = require("./config/swagger"); // Import Swagger setup

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

// Swagger documentation
swaggerSetup(app); // Initialize Swagger

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

## Step 5: Access the Swagger UI

Start your server and navigate to the Swagger UI in your browser:

- Go to your browser and use the link `http://localhost:3001/api-docs`

_NB_ to get my own `postman documentation` visit: `https://documenter.getpostman.com/view/23324874/2sAYQggTFz`
