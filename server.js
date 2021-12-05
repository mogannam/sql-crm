const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
const apiRoutes = require('./routes/apiRoutes');


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '',
      database: 'crm'
    },
    console.log('Connected to the crm database.')
  );

//   db.query(`SELECT * FROM employee`, (err, rows) => {
//     console.log(rows);
//   });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });

// Use apiRoutes
app.use('/api', apiRoutes);

  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

  