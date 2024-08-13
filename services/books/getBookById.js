//import recordData from '../../data/records.json' //assert { type: "json" };
const bookData = require('../../data/books.json');


const getBookById = (id) => {
  return bookData.books.find(book => book.id === id);
}

//export default getBookById;
module.exports = getBookById;
