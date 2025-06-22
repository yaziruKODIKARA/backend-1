const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database (auto-creates if not found)
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('❌ Could not connect to database', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

module.exports = db;
