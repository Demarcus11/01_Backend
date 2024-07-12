import { CustomAPIError } from "./custom-error.js";
import { StatusCodes } from "http-status-codes";

// BadRequestError object that inherits from the CustomAPIError's constructor, we can pass in a message and get the bad request status code from the package "http-status-codes"

export class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

// Why inherit from the CustomAPIError if all that class is doing is inheriting from the Error class?
// What would happen if I just inherited from the Error class directly?
