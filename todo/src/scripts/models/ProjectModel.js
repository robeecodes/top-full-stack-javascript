// Defines the properties of a project (e.g., name, todos, etc.).
export default function ProjectModel(id, title) {
    return {
        id: id,
        title: title,
        toDos: []
    };
}