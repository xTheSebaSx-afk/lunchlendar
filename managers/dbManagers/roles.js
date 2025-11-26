const sqlite = require('better-sqlite3');

const db = new sqlite('./db/db.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS roles(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name NVARCHAR(50) NOT NULL,
        description NVARCHAR(255) NOT NULL
    )
    `)

module.exports = {
    db
};