// Handles creating, reading, updating, and deleting todos.
export default function createToDoService() {
    return {
        toDos: [],
        loadToDos() {
            try {
                this.toDos = JSON.parse(localStorage.getItem("toDos"));
            } catch (error) {
                this.toDos = [];
            }
        },
        addToDo(toDo) {
            this.toDos.push(toDo);
            localStorage.setItem("toDos", JSON.stringify(this.toDos));
        },
        getToDo(idx) {
            if (idx < this.toDos.length) return this.toDos[idx];
        },
        deleteToDo(idx) {
            if (idx < this.toDos.length) {
                this.toDos.splice(idx, 1);
                localStorage.setItem("toDos", JSON.stringify(this.toDos));
            }
        },
        updateToDo(idx, title, description, dueDate, priority) {
            if (idx < this.toDos.length) {
                this.toDos[idx] = { ...this.toDos[idx], title, description, dueDate, priority };
                localStorage.setItem("toDos", JSON.stringify(this.toDos));
            }
        },
        toggleToDo(idx) {
            if (idx < this.toDos.length) this.toDos[idx].isCompleted = !this.toDos[idx].isCompleted;
        }
    }
}