import { CustomAPIError } from "./custom-error.js";
import { StatusCodes } from "http-status-codes";

// UnauthenticatedError object that inherits from the CustomAPIError class, we can pass in a message and get the unauthorized status code from the package "http-status-codes"

export class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
