import { fetchTasks, TASKS_ENDPOINT } from "./main.js";
import { getTasks } from "./readTask.js";

const taskIdDOM = document.querySelector("#task-id");
const taskStatusDOM = document.querySelector("#task-status");
const taskInputDOM = document.querySelector("#task-name");
const editModal = document.querySelector(".edit-modal");
const editModalForm = document.querySelector(".edit-modal__form");

let currentTaskId;

export const handleEditTask = async (e) => {
  editModal.showModal();

  const clickedElement = e.target;
  const taskElement = clickedElement.closest(".task-manager__task-list-task");

  if (taskElement) {
    const taskId = taskElement.dataset.id;
    currentTaskId = taskId;

    try {
      const data = await fetchTasks();
      for (const task of data.tasks) {
        if (taskId === task._id) {
          let { _id: taskID, completed, name } = task;
          taskIdDOM.textContent = `${taskID}`;
          taskStatusDOM.checked = completed;
          taskInputDOM.value = name;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const handleEditSubmit = async () => {
  const task = { name: taskInputDOM.value, completed: taskStatusDOM.checked };
  try {
    const response = await fetch(`${TASKS_ENDPOINT}/${currentTaskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      feedbackMessage.textContent = "Oops, something went wrong on our part";
      throw new Error("Failed to create task");
    }

    getTasks();
  } catch (error) {
    console.log(error);
  }
};

editModalForm.addEventListener("submit", handleEditSubmit);
