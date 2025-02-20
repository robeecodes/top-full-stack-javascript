// Manages the creation and modification of projects, and mapping todos to projects.
import ProjectModel from "../models/ProjectModel.js";

export default function ProjectService() {
    return {
        createProject: (title) => {
            return new ProjectModel(title);
        }
    }
}