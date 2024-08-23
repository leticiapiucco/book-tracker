import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { bookRouter } from './routes/book'
import { signupRouter } from './routes/signup'
import { loginRouter } from './routes/login'
import { logoutRouter } from './routes/logout'
import { lucia } from './auth'
import { mainRouter } from './routes'

export const app = express();
const port = 3000;


const whitelist = ['http://localhost:4200']; 
const corsOptions = {
	origin: function (origin, callback) {
	  if (whitelist.indexOf(origin) !== -1 || !origin) {
		callback(null, true);
	  } else {
		callback(new Error('Not allowed by CORS'));
	  }
	},
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	//allowedHeaders: ['Content-Type', 'Authorization'], // Add any custom headers you need
	//credentials: true, // Enable if you need to send cookies or HTTP authentication headers
};
  
app.use(cors(corsOptions));

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

app.use(mainRouter, loginRouter, signupRouter, logoutRouter, bookRouter);

app.listen(port);

console.log("Server running on port 3000");
