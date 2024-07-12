export class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message); // super() is used when using inheritence and it invokes the parent class's constructor, so this class constructor is basically the parent's constructor except we can add properties to it, we param of super() takes in a param of the child constructor if the parent already has that property. The Error parent class already has a message property and we want to set our params message to its message property
    this.statusCode = statusCode; // the Error parent class doesn't have a statusCode property so we can add it
  }
}

export const createCustomError = (message, statusCode) => {
  return new CustomAPIError(message, statusCode);
};

/*

Instead of having to write:

    const error = new Error("Not Found"); // "Not Found" will be the message property for the error object
    error.status = 404; // add a status propety to the error object
    return next(error); // need to return so the function ends after calling next(error)

inside every controller to create a new error object, pass in the message property, the status property then 
call next(error), we create a custom class that extends Error to do this, so all we have to do is create an instance
of our custom error class to do all this.


*/
