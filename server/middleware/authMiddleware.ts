import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { db } from "../db.js";
import { DatabaseUser } from "../models/user.js";

const adapter = new BetterSqlite3Adapter(db, {
	user: "Users",
	session: "session"
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<DatabaseUser, "id">;
	}
}

export const sessionMiddleware = async (req, res, next) => {
	const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
	if (!sessionId) {
		res.locals.user = null;
		res.locals.session = null;
		return next();
	}

	try {
		const { session, user } = await lucia.validateSession(sessionId);
		if (session && session.fresh) {
			res.append('Set-Cookie', lucia.createSessionCookie(session.id).serialize());
		}
		if (!session) {
			res.append('Set-Cookie', lucia.createBlankSessionCookie().serialize());
		}
		res.locals.session = session;
		res.locals.user = user;
	} catch (error) {
		res.locals.session = null;
		res.locals.user = null;
	}

	return next();
};
