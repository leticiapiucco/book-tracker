import express from "express";
import { db } from "../db";

export const mainRouter = express.Router();

mainRouter.get("/", async (_, res) => {
	if (!res.locals.user) {
		return res.redirect("/login");
	}
	return res.setHeader("Content-Type", "text/html").status(200).json({message:"Logged-in"})
});

mainRouter.get("/home", async (_, res) => {
	if (!res.locals.user) {
		return res.redirect("/login");
	}
	const userId = res.locals.user.id
    const query = 'SELECT * FROM ReadingLists WHERE user_id = ?'
	const results = db.prepare(query).all(userId)
	return res.setHeader("Content-Type", "text/html").status(200).json({results})
});