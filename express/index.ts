import express from 'express'
import bodyParser from 'body-parser'
import { db } from "./db"
import { bookRouter } from './routes/book'
import { signupRouter } from './routes/signup'
import { loginRouter } from './routes/login'
import { logoutRouter } from './routes/logout'
import { lucia } from './auth'
import { mainRouter } from './routes'

export const app = express();
const port = 3000;

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(async (req, res, next) => {
	const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
	if (!sessionId) {
		res.locals.user = null;
		res.locals.session = null;
		return next();
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize());
	}
	if (!session) {
		res.appendHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize());
	}
	res.locals.session = session;
	res.locals.user = user;
	return next();
});

app.use(mainRouter, loginRouter, signupRouter, logoutRouter);

app.listen(port);

console.log("Server running on port 3000");
