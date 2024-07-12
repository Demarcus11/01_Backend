import { CustomAPIError } from "../errors/custom-error.js";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
  // if an error happens in a controller, make a custom message
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  // else returna generic error and message
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong try again later");
};

/*

In other error classes such as bad-request.js and unauthenticated.js, the reason we inherit from
CustomAPIError is, so we can just check a single instance instead of needing to pass in everytime
class.

    err instanceof CustomAPIError

If we inherited from the Error class for every class instead of CustomAPIError, this statement would need to be 

    err instanceof BadRequestError || err instaceof UnauthenticatedError 

We shorten it by making the CustomAPIError inherit from the Error then having every other error class inherit
from it, so they're all instances of CustomAPIError but all also inherit from the Error class because
their parent CustomAPIError class does.

CustomAPIError is the middleman becuase all the class are doing the same thing but with different
status codes, CustomAPIError makes it to where we also need to check for one instance. 




*/
