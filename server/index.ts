import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { bookRouter } from './routes/book'
import { signupRouter } from './routes/signup'
import { loginRouter } from './routes/login'
import { logoutRouter } from './routes/logout'
import { sessionMiddleware } from './middleware/authMiddleware'
import { mainRouter } from './routes'
import { corsOptions } from './middleware/corsMiddleware'

export const app = express();
const port = 3000;

app.use(cors(corsOptions));

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.use(sessionMiddleware);
app.use(mainRouter, loginRouter, signupRouter, logoutRouter, bookRouter);

app.listen(port);
console.log("Server running on port " + port);
