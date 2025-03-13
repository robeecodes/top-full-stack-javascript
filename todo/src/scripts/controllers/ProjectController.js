// Manages projects, interacting with ProjectService.js.
import ProjectView from "../views/ProjectView.js";
import ProjectService from "../services/ProjectService.js";

export default function ProjectController() {
    const view = new ProjectView();
    const service = new ProjectService();

    let projects;
    let currentProject = null;

    const updateStorage = () => {
        localStorage.setItem("projects", JSON.stringify(projects));
        localStorage.currentProject = JSON.stringify(currentProject);
    }

    // Creates form to make a new project
    document.addEventListener("create-project", (e) => {
        view.renderNewProjectForm();
    });

    // Confirms creation of new project
    document.addEventListener("confirm-new-project", (e) => {
        const title = e.detail.title;

        if (!title) {
            alert("Please enter a title");
            return;
        }

        projects.push(service.createProject(projects.length, title));
        localStorage.setItem("projects", JSON.stringify(projects));

        view.renderProjectList(projects, currentProject);
    });

    // Cancel current task, re-render
    document.addEventListener("cancel-current-task", (e) => {
        // Make sure new task button is available
        document.querySelector("#create-task-button").disabled = false;
        render();
    })

    // Switch project view
    document.addEventListener("change-project-view", (e) => {
        currentProject = e.detail.project;
        localStorage.setItem("currentProject", JSON.stringify(currentProject));

        // Make sure new task button is available
        document.querySelector("#create-task-button").disabled = false;

        view.renderTasks(currentProject);
        view.renderProjectList(projects, currentProject);
    });

    // Create a new task
    document.addEventListener("create-new-task", (e) => {
        view.renderNewTaskForm();
    });

    // Confirm new task created
    document.addEventListener("confirm-new-task", (e) => {
        currentProject = service.createTask(projects, currentProject);
        document.getElementById('create-task-button').disabled = false;

        updateStorage();
        render();
    });

    // Edit a task
    document.addEventListener("edit-task", (e) => {
        service.editTask(projects, currentProject, e.detail.editButton, e.detail.toDoElement);
    });

    // Task details have been updated
    document.addEventListener("confirm-task-update", (e) => {
        currentProject = service.updateTask(projects, currentProject, e.detail.toDo, e.detail.newTitle, e.detail.newDescription, e.detail.newDate);

        updateStorage();
        render();
    });

    // Delete a task
    document.addEventListener("delete-task", (e) => {
       currentProject = service.deleteTask(projects, currentProject, e.detail.toDoElement);

       updateStorage();
       render();
    });

    // Task has been completed
    document.addEventListener("completed-task", (e) => {
        currentProject = service.completeTask(projects, e.detail.toDo, currentProject);

        updateStorage();
    });

    async function loadProjects() {
        ({projects, currentProject} = await service.loadProjects());
    }

    function render() {
        view.renderTasks(currentProject);
        view.renderProjectList(projects, currentProject);
    }

    async function init() {
        await loadProjects();
        render();
    }

    return { init }
}