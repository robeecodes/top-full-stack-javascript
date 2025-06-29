const myLibrary = [];

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

// Get the new book form and add a new book to the library
const newBookForm = document.getElementById("newBookForm");
const alert = new bootstrap.Collapse("#invalidEntry", {
    toggle: false,

});
const alertText = document.getElementById("invalidEntry");

newBookForm.addEventListener("submit", addBookToLibrary);

function addBookToLibrary(e) {
    e.preventDefault();

    const titleEl = document.getElementById("bookTitle");
    const title = titleEl.value.trim();

    const authorEl = document.getElementById("bookAuthor");
    const author = authorEl.value.trim();
    const read = document.getElementById("checkReadStatus").checked;

    if (!title || !author) {
        console.log(title, author, read);
        alertText.innerText = "Please fill every field.";
        alert.show();

        if (!title) {
            titleEl.classList.add("is-invalid");
        }

        if (!author) {
            authorEl.classList.add("is-invalid");
        }

        setTimeout(() => {
            alert.hide();
        }, 3000)

        return;
    }

    if (myLibrary.some(book => book.title === title && book.author === author)) {
        alertText.innerText = "This Book Already Exists!";
        alert.show();

        setTimeout(() => {
            alert.hide();
        }, 3000)

        return;
    }

    myLibrary.push(new Book(title, author, read));

    displayBooks();
}

// Remove any given book
function removeBook(book) {
    const title = book.getAttribute("data-title");

    myLibrary.splice(myLibrary.indexOf(book), 1);

    displayBooks();
}

// Display the books
const booksTable = document.querySelector("#booksTable table tbody");

function displayBooks() {
    booksTable.innerHTML = "";
    myLibrary.forEach((book, index) => {
        const readStatus = book.read ? 'Read' : 'Not Read';
        const emoji = book.read ? '🙂‍↕️' : '🙂‍↔️';

        const row = document.createElement("tr");

        row.innerHTML = `
            <th class="align-middle">${book.title}</th>
            <td class="align-middle">${book.author}</td>
            <td class="text-center align-middle">
                <button type="button" class="toggle-read btn p-0 border-0 bg-transparent text-center"
                        data-index="${index}"
                        aria-label="Mark ${book.read ? 'unread' : 'read'}"
                        title="Click to mark as ${book.read ? 'Not Read' : 'Read'}">
                    <span class="fs-1">${emoji}</span>
                </button>
            </td>
            <td class="text-center align-middle">
                <button type="button" class="btn btn-danger" data-title="${book.title}" onclick="removeBook(this)">
                    Remove Book
                </button>
            </td>
        `;

        booksTable.appendChild(row);
    });

    // Attach event listeners to toggle buttons
    document.querySelectorAll(".toggle-read").forEach(button => {
        button.addEventListener("click", function() {
            const bookIndex = this.dataset.index;
            myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
            displayBooks(); // Re-render table to reflect changes
        });
    });
}


displayBooks();