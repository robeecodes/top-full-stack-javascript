import Book from "./Book.js";

export default class Library {
    constructor(booksTable) {
        this.books = [];
        this.booksTable = booksTable;
    }

    addBookToLibrary(e, alert) {
        e.preventDefault();

        const title = document.getElementById("bookTitle").value;
        const author = document.getElementById("bookAuthor").value;
        const read = document.getElementById("checkReadStatus").checked;

        if (!title || !author) {
            const alertElem = document.getElementById("invalidEntry");
            alertElem.innerText = "Please enter the title and author.";
            alert.show();

            setTimeout(() => {
                alert.hide();
            }, 3000)

            return;
        } else if (this.books.some(book => book.title === title && book.author === author)) {
            const alertElem = document.getElementById("invalidEntry");
            alertElem.innerText = "This book already exists!";
            alert.show();

            setTimeout(() => {
                alert.hide();
            }, 3000)

            return;
        }

        this.books.push(new Book(title, author, read));

        this.displayBooks();
    }

    // Remove any given book
     removeBook(book) {
        this.books.splice(this.books.indexOf(book), 1);

        this.displayBooks();
    }

    displayBooks() {
        this.booksTable.innerHTML = "";

        const delClickHandler = () => {
            this.removeBook(this)
        }

        this.books.forEach((book, index) => {
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
                <button type="button" class="btn btn-danger delete-item" data-title="${book.title}">
                    Remove Book
                </button>
            </td>
        `;

            this.booksTable.appendChild(row);

            row.querySelector(".delete-item").addEventListener('click', (e) => {
                this.removeBook(this);
            });
        });

        const thisLibrary = this;

        // Attach event listeners to toggle buttons
        document.querySelectorAll(".toggle-read").forEach(button => {
            button.addEventListener("click", function () {
                const bookIndex = this.dataset.index;
                thisLibrary.books[bookIndex].read = !thisLibrary.books[bookIndex].read;
                thisLibrary.displayBooks();
            });
        });
    }
}