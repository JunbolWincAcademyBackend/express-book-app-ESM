import express from 'express';
import getBooks from '../../services/books/getBooks.js'; // Corrected path
import getBookById from '../../services/books/getBookById.js'; // Corrected path
import createBook from '../../services/books/createBook.js'; // Corrected path
import updateBookById from '../../services/books/updateBookById.js'; // Corrected path
import deleteBook from '../../services/books/deleteBook.js'; // Corrected path
import authMiddleware from '../../middleware/advancedAuth.js'; // Corrected path
import getAuthToken from '../../utils/getAuthToken.js'; // Corrected path
import NotFoundError from '../../errors/NotFoundError.js'; // Corrected path

const booksRouter = express.Router();

// Route to get all books
booksRouter.get('/', (req, res, next) => {
  try {
    const books = getBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

// Route to get a book by ID
booksRouter.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const book = getBookById(id);

    if (!book) {
      throw new NotFoundError('Book', id);
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

// Route to create a new book
booksRouter.post('/', authMiddleware, async (req, res, next) => {
  try {
    const token = await getAuthToken();
    console.log('Token received:', token);

    const { title, author, isbn, pages, available, genre } = req.body;
    const newBook = createBook(title, author, isbn, pages, available, genre);

    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

// Route to update a book by ID
booksRouter.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const token = await getAuthToken();
    console.log('Token received:', token);

    const { id } = req.params;
    const { title, author, isbn, pages, available, genre } = req.body;
    const updatedBook = updateBookById(id, title, author, isbn, pages, available, genre);

    if (!updatedBook) {
      throw new NotFoundError('Book', id);
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
});

// Route to delete a book by ID
booksRouter.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const token = await getAuthToken();
    console.log('Token received:', token);

    const { id } = req.params;
    const deletedBookId = deleteBook(id);

    if (!deletedBookId) {
      throw new NotFoundError('Book', id);
    }

    res.status(200).json({
      message: `Book with id ${deletedBookId} was deleted!`,
    });
  } catch (error) {
    next(error);
  }
});

export default booksRouter;
