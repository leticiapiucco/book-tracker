import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SearchResultsComponent } from "../search-results/search-results.component";

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
  imports: [
    SearchResultsComponent],

  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private booksService : BooksService){
  }

  ngOnInit(){
  }
}
