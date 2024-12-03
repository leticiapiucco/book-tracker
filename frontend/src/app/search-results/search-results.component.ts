import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { debounceTime, distinctUntilChanged, distinctUntilKeyChanged, map, Observable, switchMap, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  constructor(private booksService : BooksService){
  }
}
