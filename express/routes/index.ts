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
    const query = `
        Select book_id, status FROM readingLists
        WHERE user_id = ?
    `;
	const results = db.prepare(query).get(res.locals.user.id)
	return res.setHeader("Content-Type", "text/html").status(200).json({results})
});