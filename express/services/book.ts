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
        const sql = "INSERT INTO ReadingLists (book_id, user_id) VALUES (?,?)"
        db.prepare(sql).run(
			bookId,
			userId
		);
    } catch (e) {
        console.error(e)
		if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
			return
        }else{
            throw e
        }
    }
}