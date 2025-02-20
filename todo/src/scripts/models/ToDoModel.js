// Defines the properties for a Todo item (e.g., title, isCompleted, dueDate).

export default function ToDoModel(id, title, description, dueDate, priority) {
    return {
        id: id,
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        isCompleted: false,
    };
}