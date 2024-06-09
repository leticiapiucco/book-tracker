import express, { response } from "express"
import { Book } from "../models/book"
import {db} from "../db"
import { addBookToReadingList, createBook } from "../services/book";

export const bookRouter = express.Router();

bookRouter.get('/search', async (req, res) => {
	const searchQuery : string | any = req.query.q;
	if (!searchQuery) {
		return res.status(400).json({ message: "S" });
	}
	const books = await getConvertedSearch(searchQuery)
	return res.status(200).json(books);
})


bookRouter.get('/book/:id', async (req, res) => {
	const bookId : string | any = req.params.id;
	if (!bookId) {
		return res.status(400).json({ message: "S" });
	}
	const book = await getBookAPI(bookId)
	return res.status(200).json(book);
})

bookRouter.post('/book/:id', async (req, res) => {
	const bookId : string | any = req.params.id;
	if (!bookId) {
		return res.status(400).json({ message: "S" });
	}
	const book = await getBookAPI(bookId)
	createBook(book)
	addBookToReadingList(book['id'])
	return res.status(200).json(book);
})


async function getConvertedSearch(searchQuery: string) {
	return await fetch('https://www.googleapis.com/books/v1/volumes?q='+ searchQuery +'&projection=lite&maxResults=10&orderBy=relevance').then(rspns => rspns.json())
}

async function getBookAPI(bookID: string) {
	return await fetch('https://www.googleapis.com/books/v1/volumes/'+ bookID).then(rspns => rspns.json())
}



/**

// CRUD routes for User model
bookRouter.get('/book', async (req, res) => {
  const users = await Book.findAll();
  res.json(users);
});
  
bookRouter.get('/book/:id', async (req, res) => {
	const user = await Book.findByPk(req.params.id);
	res.json(user);
  });
  
bookRouter.post('/book', async (req, res) => {
  try{
	Book.create(req.body)
	return res.json({message: "Record created successfully!"})
  } catch (e) {
	console.log(e)
	return res.json({
	  message: "Unable to create a record!"})
  }
})

  
bookRouter.put('/book/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id);
	if (book) {
	  await book.update(req.body);
	  res.json(book);
	} else {
	  res.status(404).json({ message: 'Book not found' });
	}
  });
  
bookRouter.delete('/users/:id', async (req, res) => {
	const book = await Book.findByPk(req.params.id);
	if (book) {
	  await book.destroy();
	  res.json({ message: 'Book deleted' });
	} else {
	  res.status(404).json({ message: 'Book not found' });
	}
  });

* 
 */