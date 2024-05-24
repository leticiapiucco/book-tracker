import express from "express"
import { Book } from "../models/book"

export const bookRouter = express.Router();

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