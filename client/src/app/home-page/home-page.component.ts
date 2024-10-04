import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';

export interface Book{
  title: string,
  authors: Array<string>,
  publisher: string, 
  publishedDate: string,
  description: string,
  imageLinks: { 
    "smallThumbnail":string, 
    "thumbnail":string,
  },
  id: string

}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgFor,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  books$: Observable<Book[]>;
  constructor(private booksService : BooksService){
    this.books$=this.booksService.search().pipe(map(res => res))
    console.log(this.books$)
  }

  ngOnInit(){
  }
}
