import express from "express";
import { db } from "../db.js";
import { Argon2id } from "oslo/password";
import { lucia } from "../auth.js";
import { DatabaseUser } from "../models/user.js";

export const loginRouter = express.Router();

loginRouter.get("/login", async (_, res) => {
	if (res.locals.session) {
		return res.redirect("/");
	}
	return res.setHeader("Content-Type", "text/html").status(200).json({message:"login form"});
});

loginRouter.post("/login", async (req, res) => {
	const email: string | null = req.body.email ?? null;
	if (!email || email.length < 3 || email.length > 31 ) {
		return res.setHeader("Content-Type", "text/html").status(400).json({message: "Invalid username"});
	}
	const password: string | null = req.body.password ?? null;
	if (!password || password.length < 6 || password.length > 255) {
		return res.setHeader("Content-Type", "text/html").status(400).json({message:"Invalid password"})
	}

	const existingUser = db.prepare("SELECT * FROM Users WHERE username = ?").get(email) as
		| DatabaseUser
		| undefined;
	if (!existingUser) {
		return res.setHeader("Content-Type", "text/html").status(400).json({message: "Incorrect username or password"});
	}

	const validPassword = await new Argon2id().verify(existingUser.password_hash, password);
	if (!validPassword) {
		return res.setHeader("Content-Type", "text/html").status(400).json({message: "Incorrect username or password"});
	}

	const session = await lucia.createSession(existingUser.id, {});
	res
		.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
		.appendHeader("Location", "/")
		.redirect("/home");
});