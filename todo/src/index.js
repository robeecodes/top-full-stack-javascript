import "./styles.css"

import ProjectController from "./scripts/controllers/ProjectController.js";

const projectController = new ProjectController();
await projectController.init();

const createButton = document.querySelector("#create-project-button");
createButton.addEventListener("click", (e) => {
    e.preventDefault();
    createButton.dispatchEvent(new CustomEvent('create-project', {bubbles: true}));
});

const projectsList = document.querySelector("header nav ul");
projectController.projects.forEach((project, idx) => {
    const entry = document.createElement("li");
    entry.innerHTML = `<button>${project.title}</button>`;
    entry.querySelector("button").setAttribute("aria-selected", "false");

    // Always load on default project
    if (idx === 0) entry.querySelector("button").setAttribute("aria-selected", "true");

    projectsList.appendChild(entry);
});