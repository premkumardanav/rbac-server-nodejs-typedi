import dotenv from "dotenv";

dotenv.config();

/**
 * Validate required environment variables
 */
const requiredEnvVars = [
  "JWT_SECRET",
  "DB_HOST",
  "DB_PORT",
  "DB_USERNAME",
  "DB_PASSWORD",
  "DB_DATABASE",
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
}

// JWT Configuration
export const JWT_SECRET = process.env.JWT_SECRET!;

// Server Configuration
export const PORT = Number(process.env.PORT) || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";

// Database Configuration
export const DB_HOST = process.env.DB_HOST!;
export const DB_PORT = Number(process.env.DB_PORT)!;
export const DB_USERNAME = process.env.DB_USERNAME!;
export const DB_PASSWORD = process.env.DB_PASSWORD!;
export const DB_DATABASE = process.env.DB_DATABASE!;
