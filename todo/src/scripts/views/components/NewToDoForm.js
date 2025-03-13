export default function NewToDoForm() {

    function createView() {
        const toDoElement = document.createElement('div');
        toDoElement.classList.add('todo-item');
        toDoElement.id = 'todo-form';

        toDoElement.innerHTML = `
                    <form onsubmit="return false">
                      <div>
                        <label for="title">Title</label>
                        <input type="text" id="title" name="title" pattern="^[A-Za-zÀ-ÿ0-9!?%\\-\\s]+$" title="Alphanumeric values and !?%- are allowed." required>
                      </div>
                      <div>
                        <label for="description">Description</label>
                        <input type="text" id="description" name="description" required>
                      </div>
                      <div>
                        <label for="due_date">Due Date</label>
                        <input type="date" id="due_date" name="due_date" min=${new Date().toISOString().split('T')[0]} required>
                      </div>
                      <div>
                        <label for="priority">Priority</label>
                        <select id="priority" name="priority" required>
                          <option value="high">High</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                      <button type="submit">Submit</button>
                    </form>
                `;

        // On submit create the new task if the form is valid
        toDoElement.querySelector("button").addEventListener("click", (e) => {
            if (document.querySelector('#todo-form form').checkValidity())
                toDoElement.dispatchEvent(new CustomEvent('confirm-new-task', {bubbles: true}));
        });

        return toDoElement;
    }

    return { createView };
}