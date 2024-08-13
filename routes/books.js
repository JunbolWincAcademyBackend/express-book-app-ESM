// import express from 'express';
// import getBooks from '../services/books/getBooks.js'; // dont forget to write the correct path with ../
// import getBookById from '../services/books/getBookById.js';
// import createBook from '../services/books/createBook.js';
// import updateBookById from '../services/books/updateBookById.js';
// import deleteBook from '../services/books/deleteBook.js';
// // import authMiddleware from '../middleware/auth.js';// I am not using this auth.js logic
// import authMiddleware from '../middleware/advancedAuth.js';
// import getAuthToken from '../utils/getAuthToken.js'; // ✅ Import the token utility function

const express = require('express');
const getBooks = require('../services/books/getBooks.js'); // Ensure the correct path with ../
const getBookById = require('../services/books/getBookById.js');
const createBook = require('../services/books/createBook.js');
const updateBookById = require('../services/books/updateBookById.js');
const deleteBook = require('../services/books/deleteBook.js');
const authMiddleware = require('../middleware/advancedAuth.js');
const getAuthToken = require('../utils/getAuthToken.js'); // ✅ Import the token utility function


const booksRouter = express.Router(); //Create a router instance

// This is defining a route handler in your Express application, specifically for handling GET requests to the root path ('/') of this router.
booksRouter.get('/', (req, res) => { 
  try {
    const books = getBooks(); // Fetch the books from the database getBooks will return books which are all the books in the database
    res.status(200).json(books); // Converting data array object 'books' into JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while getting list of books!');
  }
});

//-- using GET Method to add a new route based on id:
booksRouter.get('/:id',(req, res) => { 
  try {
    const { id } = req.params; // Extract the ID from the URL. This uses JavaScript's object destructuring feature.
    const book = getBookById(id);

    if (!book) {
      res.status(404).send(`Book with id ${id} was not found!`); // Use the standard 404 status code if the book cannot be found.
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while getting book by id!');
  }
});

//-- using POST Method to add a new book to the database with a new id added:
booksRouter.post('/', authMiddleware, async (req, res) => { // ✅ Make the handler async so you can use the promise from getAuthToken
  try {
    const token = await getAuthToken(); // ✅ Request a new token
    console.log('Token received:', token); // ✅ Log the token (optional)

    const { title, author, isbn, pages, available, genre } = req.body; // req.body is the request object property that stores the JSON payload we expect the client to pass to this route.
    const newBook = createBook(title, author, isbn, pages, available, genre);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while creating new book!');
  }
});

//-- using PUT Method to edit or change a book's title, author, etc:
booksRouter.put('/:id', authMiddleware, async (req, res) => { // ✅ Make the handler async
  try {
    const token = await getAuthToken(); // ✅ Request a new token
    console.log('Token received:', token); // ✅ Log the token (optional)

    const { id } = req.params; // To get the route of the book (book's name)
    const { title, author, isbn, pages, available, genre } = req.body; // This is to get the new JSON data that we PUT using Postman.
    const updatedBook = updateBookById(id, title, author, isbn, pages, available, genre);
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while updating book by id!');
  }
});

//-- using DELETE Method to delete a book
booksRouter.delete('/:id', authMiddleware, async (req, res) => { // ✅ Make the handler async
  try {
    const token = await getAuthToken(); // ✅ Request a new token
    console.log('Token received:', token); // ✅ Log the token (optional)

    const { id } = req.params;
    const deletedBookId = deleteBook(id);

    if (!deletedBookId) {
      res.status(404).send(`Book with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Book with id ${deletedBookId} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while deleting book by id!');
  }
});

// export default booksRouter;
module.exports = booksRouter;

