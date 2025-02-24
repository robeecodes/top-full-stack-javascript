import ToDoView from "./components/ToDoView.js";

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

                // Always load on default project
                if (project === currentProject) entry.querySelector("button").setAttribute("aria-selected", "true");

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

            const newProjectForm = document.createElement("form");
            newProjectForm.classList.add("new-project-form");
            newProjectForm.innerHTML =
                `<label for="project-title">Title: </label><br>
                 <input type="text" id="project-title" name="project-title"><br>`;

            const confirmButton = Object.assign(document.createElement('button'), {
                innerText: "✔️",
            });

            // Event to create new project
            confirmButton.addEventListener("click", (e) => {
                e.preventDefault();
                const value = newProjectForm.querySelector('#project-title').value;
                confirmButton.dispatchEvent(new CustomEvent('confirm-new-project', {
                    bubbles: true,
                    detail: {
                        title: value,
                    },
                }));
            });

            newProjectForm.appendChild(confirmButton);

            // Cancel creating new project
            const cancelButton = Object.assign(document.createElement('button'), {
                innerText: "❌",
            });

            cancelButton.addEventListener("click", (e) => {
                e.preventDefault();
                cancelButton.dispatchEvent(new CustomEvent('cancel-new-project', {bubbles: true}));
            });

            newProjectForm.appendChild(cancelButton);

            projectsList.appendChild(newProjectForm);
        }
    }
}