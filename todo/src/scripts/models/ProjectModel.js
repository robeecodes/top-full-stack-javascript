// Defines the properties of a project (e.g., name, todos, etc.).
export default function ProjectModel(title) {
    return {
        title: title,
        toDos: []
    };
}