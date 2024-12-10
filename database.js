// database.js
const Database = require('better-sqlite3');

// Initialize SQLite database (it creates the 'myapp.db' file if it doesn't exist)
const db = new Database('./myapp.db', { verbose: console.log });

// Create a 'verifyUser' table (if it doesn't already exist)
db.prepare(`
  CREATE TABLE IF NOT EXISTS verifyUser (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT,
    isVerified BOOLEAN DEFAULT FALSE
  )
`).run();

module.exports = db; // Make db available for other files
