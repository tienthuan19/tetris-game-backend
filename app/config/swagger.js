const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tetris Game Backend API",
      version: "1.0.0",
      description: "API documentation for the Tetris game backend.",
    },
    servers: [
      {
        url: "http://localhost:3001/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Account: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The user ID.",
              example: 1,
            },
            username: {
              type: "string",
              description: "The username.",
              example: "player1",
            },
          },
        },
        Score: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The score ID.",
              example: 1,
            },
            score: {
              type: "integer",
              description: "The player's score.",
              example: 1000,
            },
            userId: {
              type: "integer",
              description: "The ID of the user who achieved the score.",
              example: 1,
            },
          },
        },
        LeaderboardEntry: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "The player's username.",
              example: "player1",
            },
            score: {
              type: "integer",
              description: "The player's highest score.",
              example: 10000,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "A message describing the error.",
              example: "An error occurred.",
            },
            error: {
              type: "string",
              description: "The error details.",
              example: "Detailed error message.",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./app/routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
