import { getTasks } from "./readTask.js";
import { TASKS_ENDPOINT } from "./main.js";

export const handleDeleteTask = async (e) => {
  const clickedElement = e.target;
  const taskElement = clickedElement.closest(".task-manager__task-list-task");

  if (taskElement) {
    const taskId = taskElement.dataset.id;

    try {
      const response = await fetch(`${TASKS_ENDPOINT}/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        feedbackMessage.textContent = "Oops, something went wrong on our part";
        throw new Error("Failed to delete task");
      }

      getTasks();
    } catch (error) {
      console.log(error);
    }
  }
};
