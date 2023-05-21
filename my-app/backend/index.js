
const express = require('express')
const app = express()
const port = 3001

const { pool } = require("./db/citus");

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists with the given email
    const checkUserQuery = `SELECT * FROM user_credentials WHERE username = $1`;
    const checkUserValues = [email];
  
    try {
      const userExistsResult = await pool.query(checkUserQuery, checkUserValues);
  
      if (userExistsResult.rowCount > 0) {
        // User with the given email already exists
        res.status(409).json({ message: 'User with this email already exists' });
        return;
      }
  
      // If the user does not exist, insert the new user into the database
      const insertUserQuery = `INSERT INTO user_credentials (username, password) VALUES ($1, $2)`;
      const insertUserValues = [email, password];
  
      const insertResult = await pool.query(insertUserQuery, insertUserValues);
  
      // Signup successful
      res.status(201).json({ message: 'Signup successful' });
    } catch (err) {
      console.log(err.stack);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const queryString = `SELECT * FROM user_credentials WHERE username = $1 AND password = $2`;
    const queryValues = [email, password];
  
    try {
      const result = await pool.query(queryString, queryValues);
      
      if (result.rowCount > 0) {
        // Login successful
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Login failed
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (err) {
      console.log(err.stack);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
  
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
  