// import express from 'express';
// import getRecords from '../services/records/getRecords.js';
// import getRecordById from '../services/records/getRecordById.js';
// import createRecord from '../services/records/createRecord.js';
// import updateRecordById from '../services/records/updateRecordById.js';
// import deleteRecord from '../services/records/deleteRecord.js';
// // import authMiddleware from '../middleware/auth.js';
// import authMiddleware from '../middleware/advancedAuth.js';
// import getAuthToken from '../utils/getAuthToken.js'; // ✅ Import token utility function

const express = require('express');
const getRecords = require('../services/records/getRecords.js');
const getRecordById = require('../services/records/getRecordById.js');
const createRecord = require('../services/records/createRecord.js');
const updateRecordById = require('../services/records/updateRecordById.js');
const deleteRecord = require('../services/records/deleteRecord.js');
// const authMiddleware = require('../middleware/auth.js');
const authMiddleware = require('../middleware/advancedAuth.js');
const getAuthToken = require('../utils/getAuthToken.js'); // ✅ Import token utility function


//Create a router instance
const recordsRouter = express.Router();

//This is defining a route handler in your Express application, specifically for handling GET requests to the root path ('/') of this router.
/* recordsRouter.get('/', (req, res) => {
  // next is to add the '/' route and the fetch the records data with getRecords()...res.status(200)...
  try {
    const records = getRecords(); //here we fetch the records from the database getRecords will return records which are all the records in the database
    res.status(200).json(records); //converting data array object 'records'  into JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while getting list of records!');
  }
}); */
recordsRouter.get('/', (req, res) => {
  try {
    // Extract query parameters from the request
    const { artist, genre, available } = req.query;

    // Fetch records with potential filtering based on query parameters
    const records = getRecords(artist, genre, available);

    if (!records || records.length === 0) {
      // No records found
      res.status(404).send('No records found.');
    } else {
      // Return filtered records as JSON
      res.status(200).json(records);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while getting list of records!');
  }
});

//-- using GET Method to add an new route base on id:
recordsRouter.get('/:id', (req, res) => {
  //id parameter in the route means that we expect an ID to be passed that will specify which Record we are looking for. So :id = 1 or 2, 3 etc
  try {
    const { id } = req.params; //we extract the ID from the URL. This uses JavaScript's object destructuring feature. the params is the route endpoint: 1, 2, 3 etc and that will replace the placeholder 'id'.
    const record = getRecordById(id);

    if (!record) {
      //here we check if our Record was found or not with if (!record). This is a nice thing in JavaScript, as !Record can mean null or undefined, which is perfect for us to check if the Record was found because getRecordById will return such a value if it does not exist.
      res.status(404).send(`Record with id ${id} was not found!`); //here we use the standard 404 status code if the Record can not be found.
    } else {
      res.status(200).json(record);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while getting record by id!');
  }
});

//-- using POST Method to add an new Record to the database with an new id added:
recordsRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const token = await getAuthToken(); // ✅ Request a new token
    console.log('Token received:', token); // ✅ Log the token (optional)
    const { title, artist, year, available, genre } = req.body; // Use 'artist' and 'year'
    const newRecord = createRecord(title, artist, year, available, genre);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while creating new record!');
  }
});

//-- using PUT Method to edit or change a record's title, author, etc:
recordsRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const token = await getAuthToken(); // ✅ Request a new token
    console.log('Token received:', token); // ✅ Log the token (optional)
    const { id } = req.params; //to get the route of the Record(record's name)
    const { title, artist, year, available, genre } = req.body; //this is to get the new JSON data that we PUT using Postman.
    const updatedRecord = updateRecordById(id, title, artist, year, available, genre);
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while updating record by id!');
  }
});

//-- using DELETE Method to delete a record
recordsRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const token = await getAuthToken(); // ✅ Request a new token
    console.log('Token received:', token); // ✅ Log the token (optional)
    const { id } = req.params;
    const deletedRecordId = deleteRecord(id);

    if (!deletedRecordId) {
      res.status(404).send(`Record with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Record with id ${deletedRecordId} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while deleting Record by id!');
  }
});

// export default recordsRouter;
module.exports = recordsRouter;

