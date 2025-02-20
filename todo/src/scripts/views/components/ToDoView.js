export default function ToDoView() {

    function createView(toDo) {
        const toDoElement = document.createElement('div');
        toDoElement.classList.add('todo-item');
        toDoElement.setAttribute("data-priority", toDo.priority);
        toDoElement.setAttribute("data-collapsed", "true");
        toDoElement.innerHTML = `
                    <h3>${toDo.title}</h3>
                    <p class="collapsed-item">${toDo.description}</p>
                    <p class="collapsed-item">Due: ${toDo.dueDate}</p>
                    <p class="collapsed-item">Is Completed: ${toDo.isCompleted}</p>
                `;

        return toDoElement;

        // toDoElement.querySelector('.toggle').addEventListener('click', (e) => {
        //     const idx = e.originalTarget.getAttribute('data-');
        //     toDoContainer.dispatchEvent(new CustomEvent('toggle', {detail: idx}));
        // });
        //
        // toDoElement.querySelector('.delete').addEventListener('click', (e) => {
        //     const idx = e.originalTarget.getAttribute('data-id');
        //     toDoContainer.dispatchEvent(new CustomEvent('delete', {detail: idx}));
        // });
        //
        // toDoElement.querySelector('.update').addEventListener('click', (e) => {
        //     const idx = e.originalTarget.getAttribute('data-id');
        //     toDoContainer.dispatchEvent(new CustomEvent('update', {detail: idx}));
        // });
    }

    return { createView };
}