// Import required modules
const express = require('express');
const sql = require('mssql');

// Create an instance of Express.js
const router = express.Router();

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

// Create an array to store holidays
let holidays = [];

// Fetch holidays from the backend and populate the list
router.get('/holidays', (req, res) => {
  sql.connect(config, (error) => {
    if (error) {
      console.error('Error connecting to SQL Server:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const request = new sql.Request();
      request.query('SELECT * FROM holidays', (error, result) => {
        if (error) {
          console.error('Error fetching holidays:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          holidays = result.recordset;
          res.json(holidays);
        }
        sql.close();
      });
    }
  });
});

// Get holiday info from one specific user
router.get('/holidaysUser', (req, res) => {
  const userId = req.query.userId; // Assuming the user ID is passed as a query parameter

  sql.connect(config, (error) => {
    if (error) {
      console.error('Error connecting to SQL Server:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const request = new sql.Request();
      const query = `SELECT * FROM holidays WHERE userId = '${userId}'`; // Modify the query to filter holidays by user ID
      request.query(query, (error, result) => {
        if (error) {
          console.error('Error fetching holidays:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          const holidays = result.recordset;
          res.json(holidays);
        }
        sql.close();
      });
    }
  });
});


// Add a new holiday to the list
router.post('/holidays', (req, res) => {
  const { start_date, end_date, notas, status } = req.body;
  const id_user = req.session.userId; // Get the ID of the logged-in user from the session

  sql.connect(config, (error) => {
    if (error) {
      console.error('Error connecting to SQL Server:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const request = new sql.Request();
      request.input('start_date', sql.Date, start_date);
      request.input('end_date', sql.Date, end_date);
      request.input('notas', sql.VarChar(255), notas);
      request.input('status', sql.VarChar(255), status);
      request.input('id_user', sql.Int, id_user);
      request.query(
        `INSERT INTO holidays (start_date, end_date, notas, status, id_user)
        VALUES (@start_date, @end_date, @notas, @status, @id_user)`,
        (error, result) => {
          if (error) {
            console.error('Error inserting holiday:', error);
            res.status(500).json({ error: 'Failed to insert holiday' });
          } else {
            console.log('Holiday inserted successfully.');
            res.status(200).json({ message: 'Holiday inserted successfully' });
          }
          sql.close();
        }
      );
    }
  });
});

// Accept a holiday by ID
router.patch('/holidays/:id/accept', (req, res) => {
  // ... existing code for accepting a holiday ...
});

// Reject a holiday by ID
router.patch('/holidays/:id/reject', (req, res) => {
  // ... existing code for rejecting a holiday ...
});

module.exports = router;
