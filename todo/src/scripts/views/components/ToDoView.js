export default function ToDoView() {

    function createView(toDo) {
        const toDoElement = document.createElement('div');
        toDoElement.classList.add('todo-item');
        toDoElement.setAttribute("data-priority", toDo.priority);
        toDoElement.setAttribute("data-collapsed", "true");
        toDoElement.innerHTML = `
                    <div class="preview-group">
                    <h3>${toDo.title}</h3>
                        <div class="label-group">
                            <input type="checkbox" id="${toDo.title}Completed" name="${toDo.title}Completed" value="completed">
                            <label for="${toDo.title}Completed">Completed?</label><br>
                        </div>
                    </div>
                    <p class="collapsed-item">${toDo.description}</p>
                    <p class="collapsed-item">Due: ${toDo.dueDate}</p>
                    <button>▽</button>
                `;

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

        toDoElement.querySelector("button").addEventListener("click", (e) => {
            const collapsed =
                toDoElement.getAttribute("data-collapsed") === "true"
                    ? "false" : "true";
            toDoElement.setAttribute("data-collapsed", collapsed);
            e.target.innerHTML = e.target.innerHTML === "▽" ? "△" : "▽";
        });

        return toDoElement;
    }

    return { createView };
}