export default function NewProjectForm() {

    function createView() {
        const newProjectForm = document.createElement("form");
        newProjectForm.classList.add("new-project-form");
        newProjectForm.innerHTML =
            `<label for="project-title">Title: </label><br>
                 <input type="text" name="project-title"><br>`;

        const confirmButton = Object.assign(document.createElement('button'), {
            innerText: "✔️",
        });

        // Event to create new project
        confirmButton.addEventListener("click", (e) => {
            e.preventDefault();
            const value = newProjectForm.querySelector('[name="project-title"]').value;
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
            cancelButton.dispatchEvent(new CustomEvent('cancel-current-task', {bubbles: true}));
        });

        newProjectForm.appendChild(cancelButton);

        return newProjectForm;
    }

    return {createView};
}