//import recordData from '../../data/records.json'assert { type: 'json' };
const recordData = require('../../data/records.json');

// Function to get records based on genre and availability
const getRecords = (artist, genre, available) => {
  // Start with all records from the JSON data
  let records = recordData.records

   // If a genre is specified, filter records by the given genre
   if (artist) {
    records = records.filter((record) => record.artist === artist);
  }


  // If a genre is specified, filter records by the given genre
  if (genre) {
    records = records.filter((record) => record.genre === genre);
  }

  // If availability is specified, filter records by their availability status
  if (available !== undefined) {
    // JSON.parse(available) converts the string to a boolean
    records = records.filter((record) => record.available === JSON.parse(available));
  }
  // so what we are doing is record.available ( which transforms into true if the record is available) === true (if the available property is true in the record, after been transformed into a boolean by using JSON.parse())?

  return records;
};

//export default getRecords
module.exports = getRecords;
