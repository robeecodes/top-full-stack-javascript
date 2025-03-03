// Manages the creation and modification of projects, and mapping todos to projects.
import ProjectModel from "../models/ProjectModel.js";

export default function ProjectService() {
    return {
        createProject: (id, title) => {
            return new ProjectModel(id, title);
        },
        loadProjects: async () => {
            let projects;
            let currentProject;

            try {
                projects = JSON.parse(localStorage.projects);
            } catch (error) {
                projects = [];
            }

            if (projects.length === 0) {
                projects.push(new ProjectModel(projects.length, "Today's Tasks"));
                projects[0].toDos = [];
                currentProject = projects[0];

                localStorage.setItem("projects", JSON.stringify(projects));
                localStorage.currentProject = JSON.stringify(currentProject);
            } else {
                currentProject = JSON.parse(localStorage.currentProject);
            }

            return {
                projects: projects,
                currentProject: currentProject
            };
        }
    }
}