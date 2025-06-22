const express = require('express');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Create table (init)
app.get('/init', (req, res) => {
  const createQuery = `
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL
    );
  `;
  db.run(createQuery, (err) => {
    if (err) {
      res.status(500).send('Failed to initialize database');
    } else {
      res.send('✅ Table "messages" initialized.');
    }
  });
});

// Add a message
app.post('/message', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const insertQuery = `INSERT INTO messages (text) VALUES (?)`;
  db.run(insertQuery, [text], function (err) {
    if (err) {
      res.status(500).json({ error: 'Failed to insert message' });
    } else {
      res.json({ id: this.lastID, text });
    }
  });
});

// Get all messages
app.get('/messages', (req, res) => {
  const selectQuery = `SELECT * FROM messages`;
  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve messages' });
    } else {
      res.json(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
