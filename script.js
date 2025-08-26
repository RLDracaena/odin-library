// Contructor 
function Book(title, author, read, genres) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.genres = genres;
    this.id = crypto.randomUUID();

    this.changeReadStatus = function() {
       if (this.read === "Read") {
        this.read = "Not Read";
       } else {
        this.read = "Read";
       }
    }
}

let myLibrary = [];

const container = document.querySelector(".container");
const form = document.querySelector(".main-form");
const bookTitle = document.querySelector(".title");
const bookAuthor = document.querySelector(".author");
const bookGenres = document.querySelector(".genres");

const submit = document.querySelector(".submit");
submit.addEventListener("click", () => {
    if (form.checkValidity()) {
        addBooktoLibrary();
        bookTitle.style.border = "none";
        bookAuthor.style.border = "none";
        bookTitle.value = "";
        bookAuthor.value = "";
        bookGenres.value = "";
    } else {
        let border = "border: 3px solid red";
        bookTitle.style = border;
        bookAuthor.style = border;
        return;
    }
});



// add a book to the library
function addBooktoLibrary(){

// selectors 
const readOption = document.querySelector(".read");
const books = document.querySelectorAll(".book");
let bookCount = document.querySelector(".book-count");

// book object
const book = new Book(bookTitle.value, bookAuthor.value, readOption.value, bookGenres.value.split(","));

myLibrary.push(book);

// This removes all of the books and then re-adds them to update if any changes have been made
books.forEach((div) => {
    container.removeChild(div);
})

// create a card for every book in the array
myLibrary.forEach((book) => {
    const div = document.createElement("div");
    const readStatus = document.createElement("p");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const removeButton = document.createElement("button");
    const readButton = document.createElement("button");

    function getReadStatus() {
        if (book.read === "Read") {
            readButton.innerText = "Mark as Unread";
        } else {
            readButton.innerText = "Mark as Read";
        }
    }

    div.classList.add("book")
    div.setAttribute("id", book.id);
    title.innerText = `${book.title}`;
    author.innerText = `${book.author}`;

    readStatus.classList.add("read-status");
    readStatus.innerText = `Status: ${book.read}`;
    
    readButton.classList.add("read-button");
    removeButton.classList.add("remove-button");
    removeButton.innerText = "Remove";
    
    getReadStatus();

    // remove a book
    removeButton.addEventListener("click", (e) => {
        if (e.target.parentElement.id === book.id) {
            e.target.parentElement.remove();
            myLibrary = myLibrary.filter((book) => book.id !== e.target.parentElement.id);
            console.log(myLibrary);
            bookCount.innerText = `Books(${myLibrary.length})`;
        };
    });

    // change the read status
    readButton.addEventListener("click", (e) => {
        if (e.target.parentElement.id === book.id) {
            book.changeReadStatus();
            readStatus.innerText = `Status: ${book.read}`;
            getReadStatus();
        } 
    })

    // appending the contents of the cards
    container.appendChild(div);
    div.appendChild(title);
    div.appendChild(author);

    const genreWrapper = document.createElement("div");
    genreWrapper.classList.add("genre-wrapper")
    div.appendChild(genreWrapper);

    // add the genres to the book cards
    book.genres.forEach((genre) => {
        const genreDiv = document.createElement("div");
        genreDiv.classList.add("book-genre");
        genreDiv.innerText = genre;
        genreWrapper.appendChild(genreDiv);
        })
    
    div.appendChild(readStatus);
    div.appendChild(readButton);
    div.appendChild(removeButton);

    bookCount.innerText = `Books(${myLibrary.length})`;
    
    })

console.log(myLibrary);

};




