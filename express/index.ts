import express from 'express'
import bodyParser from 'body-parser'
import { db } from "./db"
import { bookRouter } from './routes/book'
import { signupRouter } from './routes/signup'

export const app = express();
const port = 3000;

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(bookRouter,signupRouter)

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

