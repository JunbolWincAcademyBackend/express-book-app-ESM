//import recordData from '../../data/records.json'assert { type: 'json' };
const recordData = require('../../data/records.json');

const updateRecordById = (id, title, artist, year, available, genre) => {
  const record = recordData.records.find((record) => record.id === id);

  if (!record) {
    throw new Error(`record with id ${id} was not found!`);
  }

  record.title = title ?? record.title; // This ‘??’ is the Nullish Coalescing Operator. it's a handy tool that lets you pick between two values. value1 ?? value2. If value1 (the new value) is defined and not null, it will be chosen. If value1 is either undefined or null, value2 (the original) will be chosen instead.
  record.artist = artist ?? record.artist;
  record.year = year ?? record.year;
  record.available = available ?? record.available;
  record.genre = genre ?? record.genre;

  return record;
};

//export default updateRecordById;
module.exports = updateRecordById;
