import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  myBooks :[] = []
  constructor(private booksService : BooksService){

  }
}
