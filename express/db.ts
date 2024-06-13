import Database from "better-sqlite3";

export const db = new Database("app.db")

db.exec(`CREATE TABLE IF NOT EXISTS Users (
    id TEXT NOT NULL PRIMARY KEY,
    Username TEXT NOT NULL UNIQUE,
    PasswordHash TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
);

db.exec(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS Books (
    BookID TEXT NOT NULL PRIMARY KEY,
    Title TEXT NOT NULL,
    Author TEXT
)`);

db.exec(`CREATE TABLE IF NOT EXISTS ReadingLists (
    ReadingListID INTEGER PRIMARY KEY UNIQUE,
    UserID TEXT NOT NULL,
    BookID TEXT NOT NULL,
    AddedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID),
    UNIQUE(UserID, BookID)
)`);
