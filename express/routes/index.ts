import express from "express";

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
	return res.setHeader("Content-Type", "text/html").status(200).json({message: "home"})
});