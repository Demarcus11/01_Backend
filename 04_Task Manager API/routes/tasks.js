import express from "express";
import * as tasksController from "../controllers/tasks.js";

// used to easily setup filter routes for a certain route such as /api/v1/tasks -> /api/v1/tasks/:id, etc.
export const router = express.Router();

// Routes for all tasks
// we use .route() when you want to chain more methods on such as get, post, etc. If you're only doing one method then you can simply do router.get(), router.post(), etc.
router.route("/").get(tasksController.getAllTasks).post(tasksController.createTask);

// Routes for a single task
router
  .route("/:id")
  .get(tasksController.getTask)
  .patch(tasksController.updateTask)
  .delete(tasksController.deleteTask);
