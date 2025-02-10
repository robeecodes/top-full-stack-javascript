import Library from "./scripts/Library.js";

// Display the books
const booksTable = document.querySelector("#booksTable table tbody");

const myLibrary = new Library(booksTable);

// Get the new book form and add a new book to the library
const newBookForm = document.getElementById("newBookForm");
const alert = new bootstrap.Collapse("#invalidEntry", {
    toggle: false
});

newBookForm.addEventListener("submit", (e) => myLibrary.addBookToLibrary(e, alert));

