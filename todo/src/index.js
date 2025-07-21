import "./styles.css"

import ProjectController from "./scripts/controllers/ProjectController.js";

const projectController = new ProjectController();

async function initProject() {
    await projectController.init();
}

initProject();

const createProjectButton = document.querySelector("#create-project-button");
createProjectButton.addEventListener("click", (e) => {
    e.preventDefault();
    createProjectButton.dispatchEvent(new CustomEvent('create-project', {bubbles: true}));
    createProjectButton.disabled = true;
});

const createTaskButton = document.querySelector("#create-task-button");
createTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    createTaskButton.dispatchEvent(new CustomEvent('create-new-task', {bubbles: true}));
    createTaskButton.disabled = true;
});