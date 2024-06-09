import express from "express";
import { db } from "../db";
import { Argon2id } from "oslo/password";
import { lucia } from "../auth";

import type { DatabaseUser } from "../models/user";

export const loginRouter = express.Router();

loginRouter.get("/", async (req, res) => {
	console.log(res.locals)
	if (res.locals.session) {
		return res.status(200).json({message: "Logged in"})
	}
	return res.status(200).json({message: "Please login"})
});
/* 
loginRouter.get("/login", async (_, res) => {
	if (res.locals.session) {
		return res.redirect("/home");
	}
	return res.status(200).json({message: "Log In Form"});
}); */

loginRouter.post("/login", async (req, res) => {
	const username: string | null = req.body.username ?? null;
	if (!username || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
        return res.status(500).json({ message: 'Invalid username' });

	}
	const password: string | null = req.body.password ?? null;
	if (!password || password.length < 6 || password.length > 255) {
		return res.status(500).json({ message: 'Invalid password' });
	}

	const existingUser = db.prepare("SELECT * FROM Users WHERE Username = ?").get(username) as
		| DatabaseUser
		| undefined;
	if (!existingUser) {
        return res.status(500).json({ message: 'Invalid username or password' })
	}
	const validPassword = await new Argon2id().verify(existingUser['PasswordHash'], password);
	if (!validPassword) {
        return res.status(500).json({ message: 'Invalid password' })
	}

	const session = await lucia.createSession(existingUser['UserID'], {});

	return res
		.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
		.appendHeader("Location", "/")
		.redirect("/");
});