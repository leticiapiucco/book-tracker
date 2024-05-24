import express from "express";
import { db } from "../db.js";
import { Argon2id } from "oslo/password";
import { lucia } from "../auth.js";
import { SqliteError } from "better-sqlite3";
import { generateId } from "lucia";

export const signupRouter = express.Router();

signupRouter.get("/signup", async (_, res) => {
	const users = db.prepare('SELECT * FROM user').get()
	return res.json(users);
	if (res.locals.session) {
		return res.redirect("/books");
	}
	return res.status(200).json();
});

signupRouter.post("/signup", async (req, res) => {
	const username: string | null = req.body.username ?? null;
	console.log(username)
	if (!username || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
		return res.json({message: "Invalid username!"})
	}
	const password: string | null = req.body.password ?? null;
	if (!password || password.length < 6 || password.length > 255) {
		return res.json({message: "Invalid password!"})
	}

	const hashedPassword = await new Argon2id().hash(password);
	const userId = generateId(15);

	try {
		db.prepare("INSERT INTO user (id, username, password) VALUES(?, ?, ?)").run(
			userId,
			username,
			hashedPassword
		);

		const session = await lucia.createSession(userId, {});
		return res
			.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
			.redirect("/book");
	} catch (e) {
		if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
			return res.json({message: 'Username is already used'})
		}else{
			return res.status(500).json({message: "Error!"});
		}
	}
});