import { db } from "../db";
export function getCurrentUser() {
    const user_id = db.prepare("SELECT UserID FROM Users WHERE Username = 'test3'").get();
    return user_id['UserID'];
}
