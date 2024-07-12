import express from "express";
import dotenv from "dotenv";
import expressAsyncError from "express-async-errors";
import path from "path";
import * as url from "url";
import { router as mainRouter } from "./routes/main.js";
import { notFound as notFoundMiddleware } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Initialize server
const server = express();

// import dotenv config variables (process.env.${VARIABLE})
dotenv.config();

// MIddleware that sets up "public" folder as static folder
server.use(express.static(path.join(__dirname, "public")));

// Middleware that enables the server the process json when a POST request is made
server.use(express.json());

// Initialize root route
server.use("/api/v1", mainRouter);

// Middleware that runs if requested route doesn't exist
server.use(notFoundMiddleware);
// Middleware that gets the error that occurs in any of the controllers
server.use(errorHandlerMiddleware);

// Start server
const PORT = process.env.PORT || 5000;

// This app will use local storage to store the info instead of a DB
const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}/...`));
  } catch (error) {
    console.log(error);
  }
};

start();
