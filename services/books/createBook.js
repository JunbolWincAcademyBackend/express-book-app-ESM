//import booksData from '../../data/books.json' assert { type: 'json' };

import { v4 as uuid } from 'uuid';
import fs from 'fs'; // This is to be able to add each new book to books.json
import path from 'path'; // This is to locate the books.json file
import { fileURLToPath } from 'url';

// Manually construct __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createBook = async (title, author, isbn, pages, available, genre) => {
  // Dynamically import the JSON data
  const booksData = await import('../../data/books.json', {
    assert: { type: 'json' }
  }).then((module) => module.default);

  const newBook = {
    id: uuid(),
    title,
    author,
    isbn,
    pages,
    available,
    genre,
  };

  booksData.books.push(newBook); // Then pushes this book to the original array

  // Write the updated books array back to the books.json file
  const booksFilePath = path.resolve(__dirname, '../../data/books.json');
  fs.writeFileSync(booksFilePath, JSON.stringify(booksData, null, 2)); // Write the data with indentation
  
  return newBook; // createBook will return the newly created book
};

export default createBook;






