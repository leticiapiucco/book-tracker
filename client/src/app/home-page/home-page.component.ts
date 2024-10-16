import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { SearchResultsComponent } from "../search-results/search-results.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgFor,
    AsyncPipe,
    JsonPipe, SearchResultsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private booksService : BooksService){
  }

  ngOnInit(){
  }
}
