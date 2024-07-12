import { CustomAPIError } from "../errors/custom-error.js";

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Error passed to this function is a custom API error (coming from a controller)
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  // Error passed from somewhere else that isn't a controller
  return res.status(500).json({ error: "Something went wrong" }); // We can set the status and json message from the error object that is passed to the next() function
};

/*

This is a ERROR middleware function which is a function in Express that uses the 4 params: err, req, res, next.

ERROR middleware functions are called in the order they appear in the code (in our case this is are only ERROR middleware function).

When you use next(error) express will call the next ERROR middleware function (in our code we call all our middleware functions in server.js).

The way we use it in our code is in the controllers. The controllers use the asyncWrapper which call the
next(error) function. In the controller we are passing an instance of the CustomAPIError class which takes
in a message and status code. Those 2 properties are passed to this function because its our next (and only) middleware
function in our code so it first checks if the 'error' in next(error) is an CustomAPIError and if so then we get the status code and
message from the controller that got the error. If its not then we just send a generic server error and message.

*/
