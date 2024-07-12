export const asyncWrapper = (callback) => {
  return async (req, res, next) => {
    try {
      callback(req, res, next); // call the function using the req, res, and next which will be from express which is in the controllers file
    } catch (error) {
      // pass error to the 'errorHandlerMiddleware()' middleware function
      next(error);
    }
  };
};

/*

We want to get rid of the redundancy of using a try-catch block in every controller, we can
use this function to call the code inside each controller inside a single try-catch.

It returns a closure that takes in a req, res, and next because those variables may need to be
used inside the controller functions. The reason we use a closure is because it allows us the pass
this function to a more descriptive named variable such as getTasks when we want to use
this function.

We can do getTasks = asyncWrapper(async (req, res, next) => {
  // some code that can use await but doesn't need a try-catch block
  console.log(req.body);
})
getTasks(); // executes the body of asyncWrapper with the code of the getTasks controller

*/
