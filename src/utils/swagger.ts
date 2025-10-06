
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv"
dotenv.config()
const isProd = process.env.NODE_ENV === "production";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation using Swagger and TypeScript",
    },
    servers: [
      { url: process.env.BACKEND_URL || "http://localhost:8143" },
    ],
  },
  apis: isProd
    ? [path.join(__dirname, "../routes/*.js"), path.join(__dirname, "../controllers/*.js")]
    : ["./src/routes/*.ts", "./src/controllers/*.ts"], // dev mode
};
const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};




