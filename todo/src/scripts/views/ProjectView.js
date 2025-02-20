import ToDoView from "./components/ToDoView.js";

export default function ProjectView() {
    return {
        render: function (project) {
            const container = document.querySelector('main');
            container.innerHTML = ``;

            container.appendChild(
                Object.assign(document.createElement('h1'), {
                    innerText: project.title,
                })
            );

            const toDoView = new ToDoView();
            project.toDos.forEach(toDo => {
                container.appendChild(
                    toDoView.createView(toDo)
                );
            });
        }
    }
}