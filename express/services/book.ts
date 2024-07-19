import {db} from "../db"
import { SqliteError } from "better-sqlite3";

export function createBook(book) {
    if (checkBookExist(book['id'])){
        console.log('Book exists')
        return
    }
	try {
        const sql = "INSERT INTO Books (id, title, author) VALUES (?,?,?)"
        db.prepare(sql).run(
			book['id'],
			book['volumeInfo']['title'],
			book['volumeInfo']['authors']
		);
    } catch (e) {
        console.error(e)
        throw e
    }
}

function checkBookExist(bookId: string) {
	const stmt = db.prepare("SELECT * FROM Books WHERE id = ?")
    const book = stmt.get(bookId)
    return book ? true : false
}

export function addBookToReadingList(userId, bookId: string) {
    try {
        const transaction = db.transaction(() => {
            // Insert into ReadingLists table
            const insertReadingList = db.prepare(`INSERT OR IGNORE INTO ReadingLists (user_id, book_id) VALUES (?, ?)`);
            insertReadingList.run(userId, bookId);

            // Update user count in BookUserCount table
            const updateUserCount = db.prepare(`
                INSERT INTO BookUserCount (book_id, user_count)
                VALUES (?, 1)
                ON CONFLICT(book_id) DO UPDATE SET user_count = user_count + 1
            `);
            updateUserCount.run(bookId);
        });

        // Execute the transaction
        transaction();
    } catch (e) {
        console.error(e)
        throw e
    }
}
