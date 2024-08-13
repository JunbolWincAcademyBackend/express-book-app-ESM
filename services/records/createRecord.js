//import recordData from '../../data/records.json'assert { type: 'json' };
const recordData = require('../../data/records.json');
// import { v4 as uuid } from 'uuid';
const { v4: uuid } = require('uuid');


const createRecord = (title, artist, year, available, genre) => {
  const newRecord = {
    id: uuid(), // Generate a unique ID
    title,
    artist,     // Use artist instead of author
    year,       // Use year instead of isbn
    available,
    genre
  };

  recordData.records.push(newRecord); // Add the new record to the array
  return newRecord; // Return the newly created record
};

// export default createRecord;
module.exports = createRecord;

