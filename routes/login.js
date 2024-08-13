// import { Router } from 'express';
// //import userData from '../data/users.json'assert { type: 'json' };
// const userData = require('../data/users.json');// switched to require instead of import
// import jwt from 'jsonwebtoken';

const { Router } = require('express');
const userData = require('../data/users.json'); // This is already correct with CommonJS
const jwt = require('jsonwebtoken');


const router = Router(); //Naming the router instance 'router'  in Express is a common convention because it is generic and can be reused across different files. When you import and use this router in your main server file 'index.js', you typically give it a more descriptive name (like loginRouter) when necessary to avoid confusion.

router.post('/', (req, res) => {
  // This defines what happens when a POST request is made to the '/login' route
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key'; //to create the secretKey we use .env which create an environment variable (which creates a random string) which comes from the runtime environment.
  const { username, password } = req.body;
  const { users } = userData; // using object destructuring.
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  }

  const token = jwt.sign({ userId: user.id }, secretKey);
  res.status(200).json({ message: 'Successfully logged in!', token });
});

//export default router;
module.exports = router;
