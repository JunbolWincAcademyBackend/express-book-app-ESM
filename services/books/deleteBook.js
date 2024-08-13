//import booksData from '../../data/books.json' assert { type: 'json' };

import fs from 'fs';
import path from 'path';

// Resolving the path to the JSON file
const filePath = path.resolve('data/books.json');

const deleteBook = (id) => {
  // Load the JSON file synchronously
  const booksData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const index = booksData.books.findIndex((book) => book.id === id);
  // So index will be the record with the id given. If the id is not found JavaScript will return -1, which is a convention for 'not found'. So if the id is not found index === -1

  if (index === -1) {
    return null;
  }

  booksData.books.splice(index, 1); // The splice method modifies the original array by removing the specified number of elements starting from the provided index = id. '1' is the deleteCount parameter that indicates exactly one element should be removed from the array, starting from the index. So in this case, only one record will be deleted.

  // Write the updated books array back to the books.json file
  fs.writeFileSync(filePath, JSON.stringify(booksData, null, 2));

  return id; // This line returns the id of the deleted book, indicating which book was successfully removed.
};

export default deleteBook;






