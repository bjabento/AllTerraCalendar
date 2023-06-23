// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./api');
const sql = require('mssql');
const session = require('express-session');

// Create a connection configuration for SQL Server
const config = {
  user: 'BDDev',
  password: 'Dev1234',
  server: 'DESKTOP-3A5S3MH',
  database: 'DBAllterra',
  port: 1433, // Specify the port
  options: {
    encrypt: true, // Enable SSL encryption
    trustServerCertificate: true, // Trust the self-signed certificate (if applicable)
  },
};

// Create an instance of Express.js
const app = express();

// Enable parsing of URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Enable parsing of JSON data
app.use(bodyParser.json());

// Serve the frontend files
app.use(express.static('public'));

// Enable session management
app.use(
  session({
    secret: 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (e.g., 24 hours)
    },
  })
);

// Function to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    next(); // Proceed to the next middleware/route handler
  } else {
    console.log('user nao loggado');
    res.redirect('/index.html'); // Redirect to the login page
  }
}

// Function to check if the user is logged out
function isLoggedOut(req, res, next) {
  if (!req.session.isLoggedIn || !req.session.userId) {
    next(); // Proceed to the next middleware/route handler
  } else {
    res.redirect('/holidayhistory.html'); // Redirect to the logged-in page
  }
}

// Serve the login page
// Serve the login page
app.get('/', (req, res) => {
  if (req.session.isLoggedIn && req.session.userId) {
    res.redirect('/holidayhistory.html'); // Redirect to the main page if the user is already logged in
  } else {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the login page
  }
});

// Handle login
app.post('/login', (req, res) => {
  const { email, password, rememberMe } = req.body;
  sql.connect(config, (error) => {
    if (error) {
      console.error('Error connecting to SQL Server:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('email:', email);
      const request = new sql.Request();
      request.input('email', sql.VarChar, email);
      request.input('password', sql.VarChar, password);
      request.query(
        'SELECT * FROM users WHERE email = @email AND password = @password',
        (error, result) => {
          if (error) {
            console.error('Error executing login query:', error);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            console.log('Login query result:', result); // Troubleshooting code
            if (result.recordset.length === 1) {
              // Set session data
              req.session.isLoggedIn = true;
              req.session.userId = result.recordset[0].id; // Assuming "id" is the column name for user ID
              console.log('ID USER:', req.session.userId);

              // Set cookie if "rememberMe" is checked
              if (rememberMe) {
                req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // Cookie expiration time (e.g., 7 days)
              }

              // Redirect to holidayhistory.html upon successful login
              res.redirect('/holidayhistory.html');
            } else {
              // Handle invalid login credentials
              res.status(401).json({ error: 'Invalid login credentials' });
            }
          }
        }
      );
    }
  });
});

// Handle logout
app.get('/logout', (req, res) => {
  // Clear session data
  console.log('ID USER:', req.session.userId);
  req.session.destroy((error) => {
    if (error) {
      console.error('Error destroying session:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Cheguei');
      //res.sendStatus(200);
      res.redirect('/index.html');  
    }
  });
});

// Serve the API routes
app.use('/api', isLoggedIn, apiRoutes);
app.use('/public/*', isLoggedIn);

app.get('/holidayhistory', isLoggedIn, function(req, res)
{
  res.render('holidayhistory', {id : req.session.userId})
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});