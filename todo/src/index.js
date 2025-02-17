import createToDoService from "./scripts/services/ToDoService.js";
import ToDoView from "./scripts/views/ToDoView.js";
import ToDoController from "./scripts/controllers/ToDoController.js";
import ToDoModel from "./scripts/models/ToDoModel.js";

const service = createToDoService();
const view = ToDoView();
const controller = ToDoController(ToDoModel, service, view);

// Set up the UI
document.body.appendChild(view.toDoContainer);
controller.init();