// Manages projects, interacting with ProjectService.js.
import ToDoModel from "../models/ToDoModel.js";
import ProjectModel from "../models/ProjectModel.js";
import ProjectView from "../views/ProjectView.js";
import ProjectService from "../services/ProjectService.js";

const toDos = [];
toDos.push(new ToDoModel(0, "e", "e", new Date(), "high"));
toDos.push(new ToDoModel(1, "e", "e", new Date(), "low"));
toDos.push(new ToDoModel(2, "e", "e", new Date(), "medium"));
toDos.push(new ToDoModel(3, "e", "e", new Date(), "high"));
toDos.push(new ToDoModel(4, "e", "e", new Date(), "low"));

export default function ProjectController() {
    const view = new ProjectView();
    const service = new ProjectService();

    let projects = [];
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
        projects.push(service.createProject(title));
        view.renderProjectList(projects, currentProject);
    });

    // Cancel creating new project
    document.addEventListener("cancel-new-project", (e) => {
        view.renderProjectList(projects, currentProject);
    })

    // Switch project view
    document.addEventListener("change-project-view", (e) => {
        currentProject = e.detail.project;
        view.renderTasks(currentProject);
        view.renderProjectList(projects, currentProject);
    });

    document.addEventListener("create-task", (e) => {
        console.log(`Create new task for ${currentProject.title}`);
    })

    async function loadProjects() {
        projects.push(new ProjectModel("Today's Tasks"));
        projects[0].toDos = toDos;
        currentProject = projects[0];
    }

    function render() {
        view.renderTasks(currentProject);
        view.renderProjectList(projects, currentProject);
    }

    async function init() {
        await loadProjects();
        render();
    }

    return {
        projects,
        currentProject,
        init
    }
}