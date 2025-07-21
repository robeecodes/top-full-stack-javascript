// Manages the creation and modification of projects, and mapping todos to projects.
import ProjectModel from "../models/ProjectModel.js";
import ToDoModel from "../models/ToDoModel";

export default function ProjectService() {
    const getObjectPosition = (arr, targetId) => {
        return arr.indexOf(arr.find(o => o.id === targetId));
    }
    return {
        createProject: (id, title) => {
            return new ProjectModel(id, title);
        },
        loadProjects: async () => {
            let projects;
            let currentProject;

            try {
                projects = JSON.parse(localStorage.projects);
            } catch (error) {
                projects = [];
            }

            if (projects.length === 0) {
                projects.push(new ProjectModel(projects.length, "Today's Tasks"));
                projects[0].toDos = [];
                currentProject = projects[0];

                localStorage.setItem("projects", JSON.stringify(projects));
                localStorage.currentProject = JSON.stringify(currentProject);
            } else {
                currentProject = JSON.parse(localStorage.currentProject);
            }
            return {
                projects: projects,
                currentProject: currentProject
            };
        },
        updateTask: (projects, currentProject, toDo, newTitle, newDescription, newDate) => {
            const projectPosition = getObjectPosition(projects, currentProject.id);

            const arr = projects[projectPosition].toDos;
            const toDoPosition = getObjectPosition(arr, toDo.id);

            arr[toDoPosition].title = newTitle;
            arr[toDoPosition].description = newDescription;
            arr[toDoPosition].dueDate = newDate;

            return projects[projectPosition];
        },
        completeTask: (projects, toDo, currentProject) => {
            const projectPosition = getObjectPosition(projects, currentProject.id);
            const arr = projects[projectPosition].toDos;

            const toDoPosition = getObjectPosition(arr, toDo.id);

            arr[toDoPosition] = toDo;

            return projects[projectPosition];
        },
        createTask: (projects, currentProject) => {
            const projectPosition = getObjectPosition(projects, currentProject.id);

            const taskDetails = document.querySelector("#todo-form form");

            const taskTitle = taskDetails.querySelector("[name='title']").value;
            const taskDescription = taskDetails.querySelector("[name='description']").value;
            const taskDueDate = new Date(taskDetails.querySelector("[name='due_date']").value);
            const taskPriority = taskDetails.querySelector("[name='priority']").value;

            const arr = projects[projectPosition].toDos;
            const id = arr.length > 0 ? arr[arr.length - 1].id + 1 : 0;

            const toDo = new ToDoModel(id, taskTitle, taskDescription, taskDueDate, taskPriority);
            arr.push(toDo);

            return projects[projectPosition];
        },
        editTask: (projects, currentProject, editButton, toDoElement) => {
            const projectPosition = getObjectPosition(projects, currentProject.id);
            const arr = projects[projectPosition].toDos;
            const toDoPosition = getObjectPosition(arr, parseInt(toDoElement.getAttribute("data-id")));

            const editables = toDoElement.querySelectorAll("[data-editable=\"true\"]");

            // If the edit button has been toggled to say "Confirm" then contents should be editable, else, confirm has been clicked
            editButton.innerHTML = editButton.innerHTML === "Edit" ? "Confirm" : "Edit";
            const canEdit = editButton.innerHTML === "Confirm" ? "true" : "false";

            editables.forEach(editable => {
                editable.setAttribute("contenteditable", canEdit);
            });

            const dateElement = toDoElement.querySelector("[data-info=\"todo-date\"]");

            dateElement.innerHTML = `
                      <div>
                        <label for="due_date">Due Date</label>
                        <input type="date" name="due_date" min=${new Date().toISOString().split('T')[0]} value=${arr[toDoPosition].dueDate} required>
                      </div>
                    `;

            const dateInput = toDoElement.querySelector("[data-info=\"todo-date\"] input");

            if (toDoElement.getAttribute("data-collapsed") === "true")
                toDoElement.setAttribute("data-collapsed", "false");

            const updateEvent = () => {
                editButton.dispatchEvent(new CustomEvent("confirm-task-update", {
                        bubbles: true,
                        detail: {
                            toDo: arr[toDoPosition],
                            newTitle: toDoElement.querySelector("[data-info=\"todo-title\"]").innerText,
                            newDescription: toDoElement.querySelector("[data-info=\"todo-description\"]").innerText,
                            newDate: dateInput.value,
                        }
                    }
                ));
                editButton.removeEventListener("click", updateEvent);
            };

            // When confirmed, dispatch an event to update the project
            editButton.addEventListener("click", updateEvent);
        },
        deleteTask: (projects, currentProject, toDoElement) => {
            const projectPosition = getObjectPosition(projects, currentProject.id);
            const arr = projects[projectPosition].toDos;
            const toDoPosition = getObjectPosition(arr, parseInt(toDoElement.getAttribute("data-id")));

            arr.splice(toDoPosition, 1);

            return projects[projectPosition];
        }
    }
}