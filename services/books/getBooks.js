//import bookData from '../../data/books.json' //assert { type: 'json' };
const bookData = require('../../data/books.json');


// Function to get books based on genre and availability
const getBooks = (genre, available) => {
  // Start with all books from the JSON data
  let books = bookData.books;

  // If a genre is specified, filter books by the given genre
  if (genre) {
    books = books.filter((book) => book.genre === genre);
  }

  // If availability is specified, filter books by their availability status
  if (available !== undefined) {
    // JSON.parse(available) converts the string to a boolean
    books = books.filter((book) => book.available === JSON.parse(available));
  }
  // so what we are doing is book.available ( which transfrom into true if the book is available) === true (if the available property is true in the book, after been transformed into a boolean by using JSON.parse())?

  return books;
};

// export default getBooks;
module.exports = getBooks;

