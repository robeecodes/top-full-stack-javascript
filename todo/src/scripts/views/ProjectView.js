import ToDoView from "./components/ToDoView.js";
import NewToDoForm from "./components/NewToDoForm";
import NewProjectForm from "./components/NewProjectForm";

export default function ProjectView() {
    return {
        renderTasks: function (project) {
            const container = document.querySelector('#project-view');
            container.innerHTML = ``;

            container.appendChild(
                Object.assign(document.createElement('h1'), {
                    innerText: project.title,
                })
            );

            if (project.toDos.length < 1) {
                container.appendChild(
                    Object.assign(document.createElement('p'), {
                        innerText: `Click the blue + to create a new task :)`
                    })
                );
                return;
            }

            const toDoView = new ToDoView();
            project.toDos.forEach(toDo => {
                container.appendChild(
                    toDoView.createView(toDo)
                );
            });
        },
        renderProjectList: function (projects, currentProject) {
            const projectsList = document.querySelector("header nav ul");
            projectsList.innerHTML = "";

            projects.forEach((project) => {
                const entry = document.createElement("li");
                entry.innerHTML = `<button>${project.title}</button>`;
                entry.querySelector("button").setAttribute("aria-selected", "false");

                // Always load on last project
                if (project.id === currentProject.id) entry.querySelector("button").setAttribute("aria-selected", "true");

                projectsList.appendChild(entry);

                entry.addEventListener("click", (e) => {
                    e.preventDefault();
                    entry.dispatchEvent(new CustomEvent('change-project-view', {
                        bubbles: true,
                        detail: {
                            project: project,
                        }
                    }));
                })
            });

            const createProjectButton = document.querySelector("#create-project-button");
            createProjectButton.disabled = false;
        },
        renderNewProjectForm: function () {
            const projectsList = document.querySelector("header nav ul");
            const newProjectForm = new NewProjectForm();

            projectsList.appendChild(newProjectForm.createView());
        },
        renderNewTaskForm: () => {
            const projectView = document.querySelector("#project-view");
            const newToDo = new NewToDoForm();
            projectView.appendChild(newToDo.createView());
        }
    }
}