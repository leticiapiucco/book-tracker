import { db } from "../db";
import { getCurrentUser } from "./user";
export function createBook(book) {
    if (checkBookExist(book['id'])) {
        console.log('Book exists');
        return;
    }
    try {
        const sql = "INSERT INTO Books (BookID, Title, Author) VALUES (?,?,?)";
        db.prepare(sql).run(book['id'], book['volumeInfo']['title'], book['volumeInfo']['authors']);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}
function checkBookExist(bookId) {
    const stmt = db.prepare("SELECT * FROM Books WHERE BookID = ?");
    const book = stmt.get(bookId);
    return book ? true : false;
}
export function addBookToReadingList(bookId) {
    const currentUser = getCurrentUser();
    console.log(currentUser);
    console.log(bookId);
    try {
        const sql = "INSERT INTO ReadingLists (BookID, UserID) VALUES (?,?)";
        db.prepare(sql).run(bookId, currentUser);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}
