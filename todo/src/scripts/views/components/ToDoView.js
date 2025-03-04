export default function ToDoView() {

    function createView(toDo) {
        // Template for the todo element
        const toDoElement = document.createElement('div');
        toDoElement.classList.add('todo-item');
        toDoElement.setAttribute("data-priority", toDo.priority);
        toDoElement.setAttribute("data-collapsed", "true");
        toDoElement.innerHTML = `
                    <div class="preview-group">
                        <h3 data-editable="true" data-info="todo-title">${toDo.title}</h3>
                        <div>
                            <button data-action="edit-todo">Edit</button>
                            <div class="label-group">
                                <input type="checkbox" id="${toDo.title}Completed" name="${toDo.title}Completed" value="completed">
                                <label for="${toDo.title}Completed">Completed?</label><br>
                            </div>
                        </div>
                    </div>
                    <p class="collapsed-item" data-editable="true" data-info="todo-description">${toDo.description}</p>
                    <p class="collapsed-item" data-editable="true" data-info="todo-date">Due: ${toDo.dueDate}</p>
                    <button data-action="expand-todo">▽</button>
                `;

        // Toggle complete state when checkbox is ticked
        const checkbox = toDoElement.querySelector(`#${toDo.title}Completed`);

        checkbox.checked = toDo.isCompleted;

        checkbox.addEventListener('change', (e) => {
            e.preventDefault();
            toDo.isCompleted = !toDo.isCompleted;

            checkbox.dispatchEvent(new CustomEvent('completed-task', {
                bubbles: true,
                detail: {
                    toDo: toDo,
                }
            }));
        });

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
            const editables = toDoElement.querySelectorAll("[data-editable=\"true\"]");

            // If the edit button has been toggled to say "Confirm" then contents should be editable, else, confirm has been clicked
            editButton.innerHTML = editButton.innerHTML === "Edit" ? "Confirm" : "Edit";
            const canEdit = editButton.innerHTML === "Confirm" ? "true" : "false";

            editables.forEach(editable => {
                editable.setAttribute("contenteditable", canEdit);
            });

            if (getCollapsedState() === "true") setCollapsedState("false");

            // When confirmed, dispatch an event to update the project
            if (editButton.innerHTML === "Edit") {
                editButton.dispatchEvent(new CustomEvent("confirm-task-update", {
                    bubbles: true,
                    detail: {
                        toDo: toDo,
                        newTitle: toDoElement.querySelector("[data-info=\"todo-title\"]").innerText,
                        newDescription: toDoElement.querySelector("[data-info=\"todo-description\"]").innerText,
                        newDate: toDoElement.querySelector("[data-info=\"todo-date\"]").innerText,
                    }
                }));
            }
        });

        return toDoElement;
    }

    return {createView};
}