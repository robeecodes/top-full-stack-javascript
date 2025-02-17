export default function ToDoView() {
    const toDoContainer = document.createElement('div');

    function render(toDos) {
        toDoContainer.innerHTML = '';
        toDos.forEach((toDo, idx) => {
            const toDoElement = document.createElement('div');
            toDoElement.classList.add('todo-item');
            toDoElement.innerHTML = `
                <h3>${toDo.title}</h3>
                <p>${toDo.description}</p>
                <p>Due: ${toDo.dueDate}</p>
                <p>Priority: ${toDo.priority}</p>
                <p>Is Completed: ${toDo.isCompleted}</p>
                <button class="toggle" data-idx="${idx}">Toggle</button>
                <button class="delete" data-idx="${idx}">Delete</button>
                <button class="update" data-idx="${idx}">Update</button>
            `;
            toDoContainer.appendChild(toDoElement);

            // View should just emit events when user interacts
            toDoElement.querySelector('.toggle').addEventListener('click', (e) => {
                const idx = e.originalTarget.getAttribute('data-idx');
                toDoContainer.dispatchEvent(new CustomEvent('toggle', { detail: idx }));
            });

            toDoElement.querySelector('.delete').addEventListener('click', (e) => {
                const idx = e.originalTarget.getAttribute('data-idx');
                toDoContainer.dispatchEvent(new CustomEvent('delete', { detail: idx }));
            });

            toDoElement.querySelector('.update').addEventListener('click', (e) => {
                const idx = e.originalTarget.getAttribute('data-idx');
                toDoContainer.dispatchEvent(new CustomEvent('update', { detail: idx }));
            });
        });
    }

    return {
        render,
        toDoContainer
    };
}