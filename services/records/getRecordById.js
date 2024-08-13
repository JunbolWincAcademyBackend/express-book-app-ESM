//import bookData from '../../data/books.json'assert { type: "json" };
const recordData = require('../../data/records.json');

const getRecordById = (id) => {
  return recordData.records.find(record=> record.id === id);
}

//export default getRecordById;
module.exports = getRecordById;
