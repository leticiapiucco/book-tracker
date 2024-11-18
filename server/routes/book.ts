import express, { response } from "express"
import {db} from "../db"
import { addBookToReadingList, createBook, getBookUserCount, isBookInReadingList, removeBookFromReadingList, updateBookStatus } from "../services/book";

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
	console.log(bookId)
	if (!bookId) {
		return res.status(400).json({ message: "S" });
	}
	const bookRequest = await getBookAPI(bookId)
	console.log(bookRequest)
	return res.status(200).json(bookRequest);
	createBook(bookRequest)
	const book = db.prepare("SELECT * FROM Books WHERE id = ?").get(bookId)
	const count = getBookUserCount(bookId)
	return res.status(200).json(count);
})

bookRouter.post('/book/:id', async (req, res) => {
    const status = req.body.status
	const bookId : string | any = req.params.id
	const userId : string = res.locals.user.id

	const book = await getBookAPI(bookId)
	createBook(book)

    if (!['to-read', 'reading', 'completed', 'did-not-finish'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }
	if (!isBookInReadingList(userId, bookId)){
		addBookToReadingList(userId, bookId)
	}
	updateBookStatus(userId, bookId, status)
	return res.status(200).json({ messsage: 'Status updated' });
})


bookRouter.post('/remove/:id', async (req, res) =>{
	const bookId : string | any = req.params.id
	const userId : string = res.locals.user.id
	removeBookFromReadingList(userId, bookId)
	return res.status(200).json({ messsage: 'Status updated' });
	}
)

async function getConvertedSearch(searchQuery: string) {
	const books : [] = await fetch('https://www.googleapis.com/books/v1/volumes?q='+ searchQuery +'&projection=lite&maxResults=10&orderBy=relevance').then(r => r.json()).then(r => r.items)
	const newbook: any[] = books.map((e) => {
		let id = e['id']; 
		e = e['volumeInfo'];
		e['id'] = id
		delete e['readingModes']
		delete e['maturityRating']
		delete e['allowAnonLogging']
		delete e['contentVersion']
		delete e['panelizationSummary']
		delete e['previewLink']
		delete e['canonicalVolumeLink']
		delete e['infoLink']
		return e
	})
	return newbook
	}
	
async function getBookAPI(bookID: string) {
	const book = await fetch('https://www.googleapis.com/books/v1/volumes/'+ bookID).then(r => r.json())
	let id = book['id']; 
	const newbook = book['volumeInfo'];
	newbook['id'] = id
	delete newbook['readingModes']
	delete newbook['maturityRating']
	delete newbook['allowAnonLogging']
	delete newbook['contentVersion']
	delete newbook['panelizationSummary']
	delete newbook['previewLink']
	delete newbook['canonicalVolumeLink']
	delete newbook['infoLink']
	return newbook
}