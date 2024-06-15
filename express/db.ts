import Database from "better-sqlite3";

export const db = new Database("app.db")

db.exec(`CREATE TABLE IF NOT EXISTS Users (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
);

db.exec(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS Books (
    id TEXT NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT
)`);

db.exec(`CREATE TABLE IF NOT EXISTS ReadingLists (
    id INTEGER PRIMARY KEY UNIQUE,
    user_id TEXT NOT NULL,
    book_id TEXT NOT NULL,
    AddedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (book_id) REFERENCES Books(id),
    UNIQUE(user_id, book_id)
)`);
