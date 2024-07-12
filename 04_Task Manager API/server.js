import "./db/connect.js";
import express from "express";
import path from "path";
import * as url from "url";
import { router as tasksRouter } from "./routes/tasks.js";
import { connectDB } from "./db/connect.js";
import dotenv from "dotenv";
import { notFound } from "./middleware/notFound.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Initialize dotenv
dotenv.config();

// Initialize server
const server = express();

// Body parser middleware, so our server can process the json the user enters when a POST request
server.use(express.json());

// Initialize static folder
server.use(express.static(path.join(__dirname, "public")));

// Initialize root route for the router
server.use("/api/v1/tasks", tasksRouter);

// Middleware for custom 404 error response, middleware is executed in a stack, since this middleware function is being added after the tasksRouter it will run its non of the routes match, if we were to put this above tasksRouter it would always run notFound because it would be before tasksRouter in the middleware stack
server.use(notFound);

// Middleware for error handler, the way error handlers in express work is that if a function calls the next(error) function and passes in a error, it will run the next ERROR middleware function in the middleware stack. A function is considered a ERROR middleware function if it has the 4 params of: (req, res, err, next). In our case our only ERROR middleware function is the errorHandlerMiddleware because it's the only function being used in middleware that has the 4 params. Only the controllers can trigger it because they use the asyncWrapper which calls next(error).
server.use(errorHandlerMiddleware);

// Start server and DB
const PORT = process.env.PORT || 5000; // let the host choose the PORT, if we're running this locally just use PORT 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_CONNECTION_STRING);
    server.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

/*

REST API Routes:

- app.get('/api/v1/tasks') - gell all the tasks
- app.post('/api/v1/tasks') - create a new task
- app.get('/api/v1/tasks/:id') - get a single task
- app.patch('/api/v1/tasks/:id') - update a task
- app.delete('/api/v1/tasks/:id') - delete a task

Q and As
--------

1. Why use /api?

- Its a organization convention because you could be serving different things on the same server. On your server you could have a
route unrelated to the API, so its best to organize your routes. For this app it makes sense because its a tasks app where there's
a frontend being served. If you look at the countries API: https://restcountries.com/v3.1/all, they don't have /api because they
aren't serving a frontend app, its just an API so the /api can be omitted.

2. Why use version numbers such as /v1?

- People may be using the old version of the API and their systems may break if you change something directly with the current 
version of the API. This is the same reason JS doesnt make updates on the current version of the language but instead pushes a 
new updated version for people who want to update. If you were to ever change the API you can direct everyone to v2, v3, etc. 

3. Why use /tasks?

- This is a REST convention where you seperate your APIs in different categories (also called resources) and create routes for them, 
so in this case we have a tasks category on our API.

*/
