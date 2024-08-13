//import recordsData from '../../data/records.json' assert { type: "json" };

// Importing the necessary modules
import fs from 'fs';
import path from 'path';

// Resolving the path to the JSON file
const filePath = path.resolve('data/books.json');

const getBookById = (id) => {
  // Load the JSON file synchronously
  const booksData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Find and return the record with the specified ID
  return booksData.books.find((book) => book.id === id);
};

export default getBookById;

