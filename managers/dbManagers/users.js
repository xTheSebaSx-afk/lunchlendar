const sql = require("better-sqlite3");
const db = new sql("./db/db.db")

db.pragma("foreign_keys = ON");

db.exec(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username NVARCHAR(50) NOT NULL,
            password NVARCHAR(20) NOT NULL,
            email NVARCHAR(70) NOT NULL,
            role INTEGER NOT NULL,
            FOREIGN KEY (role) REFERENCES roles(id)
        )
    `);


const addUser = ({ username, password, email, role }) => {

    if (getUser({ username })) {
        throw new Error("User already exists");
    }

    if (password.length > 20) {
        throw new Error("Password is too long");
    }

    if (password == username) {
        throw new Error("Password cannot be the same as username");
    }

    if (username.length > 50) {
        throw new Error("Username is too long");
    }

    db.prepare(
        `INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`
    ).run(username, password, email, role);

    return getUser({ username });

}

const getUser = ({ username }) => {
    const user = db.prepare(`SELECT * FROM users WHERE username = ?`).get(username);
    return user;
}

const getUsers = () => {
    const users = db.prepare(`SELECT * FROM users`).all();
    return users;
}

const removeUser = () => { }

module.exports = {
    db,
    addUser,
    getUser,
    removeUser,
    getUsers
};