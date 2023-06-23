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
  if (req.session.isLoggedIn) {
    next(); // Proceed to the next middleware/route handler
  } else {
    res.redirect('/index.html'); // Redirect to the login page
  }
}

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle login
app.post('/login', (req, res) => {
  // ... existing code for login ...
});

// Handle logout
app.get('/logout', (req, res) => {
  // Clear session data and destroy the session
  req.session.isLoggedIn = false;
  req.session.userId = null;
  req.session.destroy((error) => {
    if (error) {
      console.error('Error destroying session:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.redirect('/index.html'); // Redirect to the login page after logout
    }
  });
});

// Protect other pages by checking if the user is logged in
app.get('/markholiday.html', isLoggedIn);
app.get('/holidayhistory.html', isLoggedIn);

// Add the API routes
app.use('/api', apiRoutes);

// Add a catch-all route for other pages
app.get('*', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'holidayhistory.html'));
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
