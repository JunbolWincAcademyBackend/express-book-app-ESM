//import booksData from '../../data/books.json' assert { type: 'json' };
const booksData = require('../../data/books.json');
//import { v4 as uuid } from 'uuid';
//import fs from 'fs'; //this is to be able to add each new book to books.json
//import path from 'path'; //this is to be able to add each new book to books.json, this will be use to locate the file books.json file
//import { fileURLToPath } from 'url';

const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');


// Manually construct __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Use __dirname directly in CommonJS
const filePath = path.join(__dirname, '../data/books.json');

const createBook = (title, author, isbn, pages, available, genre) => {
  throw new Error('Not implemented!');
  const newBook = {
    //this creates a new book
    //id: bookData.length + 1,// so the first time this will be use it will turn into 7 because there are 6 books at the moment.
    id: uuid(),
    title,
    author,
    isbn,
    pages,
    available,
    genre,
  };

  booksData.books.push(newBook); //then pushes this book to the original array

  // Write the updated books array back to the books.json file
  // Correctly resolve the path to books.json from the project root
  const booksFilePath = path.resolve(__dirname, '../../data/books.json');
  fs.writeFileSync(booksFilePath, JSON.stringify(booksData, null, 2)); // Write the data with indentation
  return newBook; //createBook will return the new created book
};

//export default createBook;
module.exports = createBook;
