export default function ToDoView() {

    function createView(toDo) {
        // Template for the todo element
        const toDoElement = document.createElement('div');
        toDoElement.classList.add('todo-item');
        toDoElement.setAttribute("data-priority", toDo.priority);
        toDoElement.setAttribute("data-id", toDo.id);
        toDoElement.setAttribute("data-collapsed", "true");

        const titleSlug = toDo.title
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");

        const date = new Date(toDo.dueDate).toLocaleDateString();

        toDoElement.innerHTML = `
                    <div class="preview-group">
                        <h3 data-editable="true" data-info="todo-title">${toDo.title}</h3>
                        <div>
                            <button data-action="edit-todo">Edit</button>
                            <button data-action="delete-todo">Delete</button>
                            <div class="label-group">
                                <input type="checkbox" id="${titleSlug}Completed" name="${titleSlug}Completed" value="completed">
                                <label for="${titleSlug}Completed">Completed?</label><br>
                            </div>
                        </div>
                    </div>
                    <p class="collapsed-item" data-editable="true" data-info="todo-description">${toDo.description}</p>
                    <p class="collapsed-item" data-editable="true" data-info="todo-date">Due: ${date}</p>
                    <button data-action="expand-todo">▽</button>
                `;

        const expandButton = toDoElement.querySelector("button[data-action=\"expand-todo\"]");

        // Returns true if the todo is collapsed
        const getCollapsedState = () => {
            return toDoElement.getAttribute("data-collapsed");
        }

        // Set the collapsed state
        const setCollapsedState = (state) => {
            toDoElement.setAttribute("data-collapsed", state);
            expandButton.innerHTML = expandButton.innerHTML === "▽" ? "△" : "▽";
        }

        // Toggle the collapsed state when the expand button is clicked
        expandButton.addEventListener("click", (e) => {
            const state = getCollapsedState();
            setCollapsedState(state === "true" ? "false" : "true");
        });

        const editButton = toDoElement.querySelector("button[data-action=\"edit-todo\"]");

        // When the edit button is clicked, make editable content and expand todo if collapsed
        editButton.addEventListener("click", (e) => {
            editButton.dispatchEvent(new CustomEvent('edit-task', {
                bubbles: true,
                detail: {
                    toDoElement: toDoElement,
                    editButton: editButton,
                }
            }));
        });

        // Delete the task when the delete button is clicked
        const deleteButton = toDoElement.querySelector("button[data-action=\"delete-todo\"]");
        deleteButton.addEventListener("click", (e) => {
            deleteButton.dispatchEvent(new CustomEvent('delete-task', {
                bubbles: true,
                detail: {
                    toDoElement: toDoElement,
                }
            }))
        })

        // Toggle complete state when checkbox is ticked
        const checkbox = toDoElement.querySelector(`#${titleSlug}Completed`);

        checkbox.checked = toDo.isCompleted;
        editButton.disabled = toDo.isCompleted;

        checkbox.addEventListener('change', (e) => {
            e.preventDefault();
            toDo.isCompleted = !toDo.isCompleted;
            editButton.disabled = toDo.isCompleted;

            checkbox.dispatchEvent(new CustomEvent('completed-task', {
                bubbles: true,
                detail: {
                    toDo: toDo,
                }
            }));
        });

        return toDoElement;
    }

    return {createView};
}