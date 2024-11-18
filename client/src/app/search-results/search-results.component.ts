import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

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
  selector: 'app-search-results',
  standalone: true,
  imports: [NgFor,
    AsyncPipe,
    JsonPipe,
    RouterLink
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit{
  books$: Observable<Book[]>
  constructor(private booksService : BooksService){
    this.books$=this.booksService.search().pipe(map(res => res))

  }
  ngOnInit(){
    this.books$=this.booksService.search().pipe(map(res => res))
  }
}
