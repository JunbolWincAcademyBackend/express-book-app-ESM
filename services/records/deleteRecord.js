//import recordData from '../../data/records.json'assert { type: 'json' };
const recordData = require('../../data/records.json');

const deleteRecord = (id) => {
  const index = recordData.records.findIndex((record) => record.id === id);
  // So index will be the record with the id given. If the id is not found Javascript will return -1 which a convention for 'not found'. So in this if is not found index === -1

  if (index === -1) {
    return null;
  }

  recordData.records.splice(index, 1); //index: This is the index of the record in the array recordData.records that matches the given id. The splice method modifies the original array by removing the specified number of elements starting from the provided index = id. '1'is The deleteCount parameter that indicates exactly one element should be removed from the array, starting from the index.So in this case only one record will be deleted. If it was 2 then 2 records will be deleted starting from the index (id) given.
  return id; //This line returns the id of the deleted record, indicating which record was successfully removed.
};

// export default deleteRecord;
module.exports = deleteRecord;
