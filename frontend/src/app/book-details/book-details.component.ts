import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BookDetailsModel, BooksService } from '../services/books.service';
import { AsyncPipe, JsonPipe } from '@angular/common';


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{
  book$?: Observable<BookDetailsModel>;
  @Input() id!: string;

  constructor(private route: ActivatedRoute, private service: BooksService) {
    this.book$ = this.service.getBook(this.id)
  }

  ngOnInit() {
    this.book$ = this.service.getBook(this.id)
    console.log(this.book$)
  }
}
