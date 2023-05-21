import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { pool } from './db/citus.js'
import cors from 'cors'

const app = express();
const port = 3001

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["POST","GET"],
    credentials: true
}));
app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.get('/inventory', async (req,res) => {
    const query = "SELECT * FROM inventory";
    try {
        const queryResult = await pool.query(query);
        if (queryResult.rowCount > 0) {
            res.status(200).json({ data:queryResult });
        }
    } catch(err) {
        console.log(err.stack);
        res.status(500).json({ message: 'An error occurred' });
    }
})

app.get('/', (req,res) => {
    if(req.session.username) {
        return res.json({valid: true, username: req.session.username})
    } else {
        return res.json({valid:false})
    }
})

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
        //Debug:
        //console.log(result.rows[0].username)

        req.session.username = result.rows[0].username
        res.status(200).json({ message: 'Login successful'});
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
  