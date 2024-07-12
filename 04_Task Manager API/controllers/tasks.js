import { model as TaskModel } from "../models/Task.js";
import { asyncWrapper } from "../middleware/async.js";
import { createCustomError } from "../errors/custom-error.js";
import mongoose from "mongoose";

// Reads all documents from the db
export const getAllTasks = asyncWrapper(async (_, res) => {
  const tasks = await TaskModel.find({});
  res.status(200).json({ tasks });
  // if an error happens when getttng the tasks the asyncWrapper catches the error and calls the error middleware function
});

// Creates a new document with the schema from the model then sends back the new document as a response with a status of successful post request
export const createTask = asyncWrapper(async (req, res) => {
  const task = await TaskModel.create(req.body); // req.body will be the json the user sends to create a task, since our model has a schema it expects name and completed properties
  res.status(201).json({ task });
});

// Gets a single task by its id from the db
export const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params; // destructure the id from params object and give it the alias of taskID

  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    // Pass the custom error to the middleware function: 'errorHandlerMiddleware()'
    return next(createCustomError(`Invalid task ID: ${taskID}`, 400));
  }

  const task = await TaskModel.findOne({ _id: taskID });

  // if task isn't found
  if (!task) return next(createCustomError(`No task with id: ${taskID}`, 404));

  res.status(200).json({ task });
});

/*

If we weren't using the asyncWrapper to get rid of the try-catch the above function would look like:

  export const getTask = async (req, res, next) => {
    try {
      const { id: taskID } = req.params; 
      const task = await TaskModel.findOne({ _id: taskID });

      if (!task) {
        const customError = createCustomError(`No task with id: ${taskID}`, 404)
        return next(customError); // customError would be passed to the next ERROR middleware function (which is errorHandlerMiddleware)
      }

      res.status(200).json({ task });
    }
    catch (error) {
      next(error);
    }
};

*/

// Updates a task given its id in the db
export const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await TaskModel.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true, // returns the new object that the user sends
    runValidators: true,
  });

  if (!task) return next(createCustomError(`No task with id: ${taskID}`), 404);

  res.status(200).json({ task });
});

// Deletes a task given its id from the db
export const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await TaskModel.findOneAndDelete({ _id: taskID });

  if (!task) return next(createCustomError(`No task with id: ${taskID}`), 404);

  res.status(200).send();
});
