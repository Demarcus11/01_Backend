import { createTasks } from "./createTask.js";
import { showLoading, hideLoading } from "./main.js";
import { handleEditTask } from "./updateTask.js";
import { handleDeleteTask } from "./deleteTask.js";

const taskList = document.querySelector(".task-manager__task-list");

export const getTasks = async () => {
  try {
    showLoading();
    taskList.innerHTML = await createTasks();
    hideLoading();

    const deleteTaskBtn = document.querySelectorAll(".delete-btn");
    const editTaskBtn = document.querySelectorAll(".edit-btn");

    editTaskBtn.forEach((button) => {
      button.addEventListener("click", handleEditTask);
    });

    deleteTaskBtn.forEach((button) => {
      button.addEventListener("click", handleDeleteTask);
    });
  } catch (error) {
    console.log(error);
  }
};
