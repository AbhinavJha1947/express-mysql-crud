const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// MySQL database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Abhinav@12345',
  database: 'SampleDB', // Replace with your database name
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Middleware
app.use(bodyParser.json());

// Create a new record
app.post('/api/records', (req, res) => {
  const { name, age } = req.body;
  const sql = 'INSERT INTO Records (Name, Age) VALUES (?, ?)';
  pool.query(sql, [name, age], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
      return;
    }
    res.status(201).send('Record created successfully');
  });
});

// Read all records
app.get('/api/records', (req, res) => {
  const sql = 'SELECT * FROM Records';
  pool.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
      return;
    }
    res.send(result);
  });
});

// Update a record
app.put('/api/records/:id', (req, res) => {
  const { name, age } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE Records SET Name = ?, Age = ? WHERE Id = ?';
  pool.query(sql, [name, age, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
      return;
    }
    res.send('Record updated successfully');
  });
});

// Delete a record
app.delete('/api/records/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Records WHERE Id = ?';
  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
      return;
    }
    res.send('Record deleted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
