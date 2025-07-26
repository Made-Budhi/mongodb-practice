const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Loads environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// --- Middleware ---
// CORS: Allows requests from other origins (e.g., a frontend application)
app.use(cors());
// Body Parser: Allows the server to accept and parse JSON in request bodies
app.use(express.json());

// --- Database Connection ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Successfully connected to MongoDB.");
});

// --- Swagger/OpenAPI Documentation Setup ---
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'A simple Express API to manage notes',
      contact: {
        name: 'Amazing Dev',
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
    ],
  },
  // Path to the API docs
  apis: ['./routes/*.js'], // Looks for JSDoc comments in all .js files in the routes folder
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- API Routes ---
// This tells the server to use the routes defined in note.routes.js
// for any URL that starts with "/api/notes"
const noteRoutes = require('./routes/note.routes');
app.use('/api/notes', noteRoutes);

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});