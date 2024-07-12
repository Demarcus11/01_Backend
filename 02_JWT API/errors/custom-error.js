// CustomAPIError object that we can pass in an error message that inherits from the Error class constructor

export class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}
