import express from "express";
import path from "path";
import * as url from "url";
import dotenv from "dotenv";
import { notFound as notFoundMiddleware } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { connectDB } from "./db/connect.js";
import { router as productsRouter } from "./routes/products.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Import environment variables (process.env.${VARIABLE})
dotenv.config();

// Initialize server
const server = express();

// Middleware for our server to be able to process JSON data being sent to it
server.use(express.json());

// App routes
server.use(express.static(path.join(__dirname, "public")));

// API routes
server.use("/api/v1/products", productsRouter); // Root route

server.use(notFoundMiddleware); // if a route isn't found this middleware function will run first

server.use(errorHandlerMiddleware); // if an error occurs in a controller, the error will be sent to this function and invoked

// Start server
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, console.log(`Server is running at: http://localhost:${PORT}/...`));
  } catch (error) {
    console.log(error);
  }
};

start();
