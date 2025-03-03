// Manages projects, interacting with ProjectService.js.
import ToDoModel from "../models/ToDoModel.js";
import ProjectView from "../views/ProjectView.js";
import ProjectService from "../services/ProjectService.js";

const toDos = [];
toDos.push(new ToDoModel(0, "e", "e", new Date(), "high"));

export default function ProjectController() {
    const view = new ProjectView();
    const service = new ProjectService();

    let projects;
    let currentProject = null;

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

    // Cancel creating new project
    document.addEventListener("cancel-new-project", (e) => {
        view.renderProjectList(projects, currentProject);
    })

    // Switch project view
    document.addEventListener("change-project-view", (e) => {
        currentProject = e.detail.project;
        localStorage.setItem("currentProject", JSON.stringify(currentProject));

        view.renderTasks(currentProject);
        view.renderProjectList(projects, currentProject);
    });

    document.addEventListener("create-new-task", (e) => {
        console.log(`Create new task for ${currentProject.title}`);
    });

    document.addEventListener("completed-task", (e) => {
        const updateProject = projects[currentProject.id];
        updateProject.toDos[e.detail.toDo.id] = e.detail.toDo;

        localStorage.setItem("projects", JSON.stringify(projects));
    });

    document.addEventListener("confirm-new-task", (e) => {
        console.log(`New task created for ${currentProject.title}`);
    });

    async function loadProjects() {
        ({projects, currentProject} = await service.loadProjects());

        if (projects[0].toDos.length === 0) {
            projects[0].toDos = toDos;
            localStorage.setItem("projects", JSON.stringify(projects));
        }
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