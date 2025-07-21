export default function submitForm(event, inputsMatch) {
    if (!inputsMatch) {
        event.preventDefault();
        alert("Passwords do not match or only contain whitespace.");
    }
}