import { Router } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

// Resolving the path to the users.json file
const usersFilePath = path.resolve('data/users.json');

// Load the JSON file synchronously
const userData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

const router = Router(); // Naming the router instance 'router' in Express is a common convention because it is generic and can be reused across different files. When you import and use this router in your main server file 'index.js', you typically give it a more descriptive name (like loginRouter) when necessary to avoid confusion.

router.post('/', (req, res) => {
  // This defines what happens when a POST request is made to the '/login' route
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key'; // to create the secretKey we use .env which create an environment variable (which creates a random string) which comes from the runtime environment.
  const { username, password } = req.body;
  const { users } = userData; // using object destructuring.
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  }

  const token = jwt.sign({ userId: user.id }, secretKey);
  res.status(200).json({ message: 'Successfully logged in!', token });
});

export default router;







