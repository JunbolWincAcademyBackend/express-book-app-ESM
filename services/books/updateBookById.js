//import bookData from '../../data/books.json' assert { type: 'json' };
const bookData = require('../../data/books.json');

const updateBookById = (id, title, author, isbn, pages, available, genre) => {
  const book = bookData.books.find((book) => book.id === id);

  if (!book) {
    throw new Error(`book with id ${id} was not found!`);
  }

  book.title = title ?? book.title; // This ‘??’ is the Nullish Coalescing Operator. it's a handy tool that lets you pick between two values. value1 ?? value2. If value1 (the new value) is defined and not null, it will be chosen. If value1 is either undefined or null, value2 (the original) will be chosen instead.
  book.author = author ?? book.author;
  book.isbn = isbn ?? book.isbn;
  book.pages = pages ?? book.pages;
  book.available = available ?? book.available;
  book.genre = genre ?? book.genre;

  return book;
};

// export default updateBookById;
module.exports = updateBookById;
