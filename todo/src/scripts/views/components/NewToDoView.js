export default function NewToDoView() {

    function createView() {
        const toDoElement = document.createElement('div');
        toDoElement.classList.add('todo-item');
        toDoElement.innerHTML = `
                    <form>
                      <div>
                        <label for="title">Title</label>
                        <input type="text" id="title" name="title" required>
                      </div>
                      <div>
                        <label for="description">Description</label>
                        <input type="text" id="description" name="description" required>
                      </div>
                      <div>
                        <label for="due_date">Due Date</label>
                        <input type="date" id="due_date" name="due_date" required>
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

        toDoElement.querySelector("button").addEventListener("click", (e) => {
            e.preventDefault();
            toDoElement.dispatchEvent(new CustomEvent('confirm-new-task', {bubbles: true}));
        });

        return toDoElement;
    }

    return { createView };
}