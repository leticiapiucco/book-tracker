import express from "express";
import { db } from "../db.js";
import { Argon2id } from "oslo/password";
import { lucia } from "../auth.js";
import { SqliteError } from "better-sqlite3";
import { generateId } from "lucia";

export const signupRouter = express.Router();

signupRouter.get("/signup", async (_, res) => {
	if (res.locals.session) {
		return res.redirect("/home");
	}
	return res.status(200).json({message: "Registration Form is shown"});
});

signupRouter.post("/signup", async (req, res) => {
	const email: string | null = req.body.email ?? null;
	if (!email || email.length < 3 || email.length > 31) {
		return res.json({ message: "Invalid username!" })
	}
	const password: string | null = req.body.password ?? null;
	if (!password || password.length < 6 || password.length > 255) {
		return res.json({ message: "Invalid password!" })
	}

	const hashedPassword = await new Argon2id().hash(password);
	const userId = generateId(15);

	try {
		db.prepare("INSERT INTO Users (id, username, password_hash) VALUES(?, ?, ?)").run(
			userId,
			email,
			hashedPassword
		);

		const session = await lucia.createSession(userId, {});
		return res
			.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
			.redirect("/home");
	} catch (e) {
		if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
			return res.json({ message: 'Username is already used' })
		} else {
			console.log(e)
			return res.status(500).json({ message: e.code });
		}
	}
});