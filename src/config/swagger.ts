import swaggerJSDoc from "swagger-jsdoc";
import { PORT } from "./env.js";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "HIPAA Healthcare RBAC API",
      version: "1.0.0",
      description:
        "Secure API documentation for Admin, Doctor, and Nurse roles. This API implements Role-Based Access Control (RBAC) for healthcare management with HIPAA compliance.",
      contact: {
        name: "API Support",
        email: "support@healthcare.example.com",
      },
      license: {
        name: "ISC",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development Server",
      },
      {
        url: "https://api.healthcare.example.com",
        description: "Production Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "JWT Bearer token for authentication. Obtain token from /auth/login endpoint",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique user identifier",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address (unique)",
            },
            role: {
              type: "string",
              enum: ["admin", "doctor", "nurse"],
              description: "User role in the system",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Account creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last account update timestamp",
            },
          },
        },
        Patient: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique patient identifier",
            },
            name: {
              type: "string",
              description: "Patient name",
            },
            diagnosis: {
              type: "string",
              nullable: true,
              description:
                "Patient diagnosis (sensitive, only for authorized users)",
            },
            doctor: {
              $ref: "#/components/schemas/User",
              description: "Assigned doctor",
            },
            nurse: {
              $ref: "#/components/schemas/User",
              nullable: true,
              description: "Assigned nurse (if any)",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "admin@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "securePassword123",
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "JWT authentication token (valid for 1 hour)",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
          },
        },
      },
    },
    security: [{ BearerAuth: [] }],
    tags: [
      {
        name: "Authentication",
        description: "User authentication and authorization",
      },
    ],
  },

  // Folder for endpoints
  apis: ["./src/modules/**/*.ts"],
});
