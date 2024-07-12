import { getTasks } from "./readTask.js";

// Variables

const form = document.querySelector(".task-manager__form");
const taskInput = document.querySelector(".task-manager__input");
const feedbackMessage = document.querySelector(".feedback");
const loadingDOM = document.querySelector(".loading-text");

export const TASKS_ENDPOINT = "http://localhost:5000/api/v1/tasks";

// Functions

export const showLoading = () => {
  loadingDOM.style.display = "block";
};

export const hideLoading = () => {
  loadingDOM.style.display = "none";
};

export const fetchTasks = async () => {
  try {
    const response = await fetch(TASKS_ENDPOINT);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (error) {
    console.log(`Error fetching tasks:`, error);
    return null;
  }
};

getTasks();

// When the form is submitted, get the value from the input, create a task object, make a POST request to the endpoint, clear input and re-render tasks
const handleFormSubmit = async (e) => {
  e.preventDefault();

  const taskName = taskInput.value;

  if (taskName === "") {
    feedbackMessage.textContent = "Task name cannot be empty";
    feedbackMessage.dataset.message = "error";
    return;
  }

  const task = { name: taskName };

  try {
    const response = await fetch(TASKS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      feedbackMessage.textContent = "Oops, something went wrong on our part";
      feedbackMessage.dataset.message = "error";
      throw new Error("Failed to create task");
    }

    taskInput.value = "";

    feedbackMessage.textContent = "Successfully added task";
    feedbackMessage.dataset.message = "success";

    getTasks();
  } catch (error) {
    console.log(error);
  }
};

// Event Listeners

form.addEventListener("submit", handleFormSubmit);
