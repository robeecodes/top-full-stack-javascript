import "./styles.css"

import ProjectController from "./scripts/controllers/ProjectController.js";

const projectController = new ProjectController();
await projectController.init();

const createProjectButton = document.querySelector("#create-project-button");
createProjectButton.addEventListener("click", (e) => {
    e.preventDefault();
    createProjectButton.dispatchEvent(new CustomEvent('create-project', {bubbles: true}));
    createProjectButton.disabled = true;
});

const createTaskButton = document.querySelector("#create-task-button");
createTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    createTaskButton.dispatchEvent(new CustomEvent('create-task', {bubbles: true}));
});