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


    document.addEventListener("create-project", (e) => {
        console.log("Create new project");
        render();
        // projects.push(service.createProject(title));
    })

    async function loadProjects() {
        projects.push(new ProjectModel("Today's Tasks"));
        projects[0].toDos = toDos;
        currentProject = projects[0];
    }

    function render() {
        view.render(currentProject);
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