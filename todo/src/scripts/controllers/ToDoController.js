// Receives actions from the UI and calls methods from TodoService.js to fetch/update data.
export default function ToDoController(model, service, view) {
    // Listen for events from the view
    view.toDoContainer.addEventListener('toggle', (e) => {
        const idx = e.detail;
        service.toggleToDo(idx);
        renderToDos();
    });

    view.toDoContainer.addEventListener('delete', (e) => {
        const idx = e.detail;
        service.deleteToDo(idx);
        renderToDos();
    });

    view.toDoContainer.addEventListener('update', (e) => {
        const idx = e.detail;
        renderToDos();
    });

    // This method can initialize the view with data from the service
    function renderToDos() {
        view.render(service.toDos);
    }

    // Initialize the view with the current todos
    function init() {
        service.loadToDos();
        renderToDos();
    }

    return {init};
}