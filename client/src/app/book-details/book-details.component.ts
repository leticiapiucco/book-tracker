import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { BooksService } from '../services/books.service';

interface BookDetailsMode {
  
}


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  book$ :Observable<any>;
  selectedId!: string;

  constructor(private route: ActivatedRoute, private service: BooksService) {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.service.getBook(this.selectedId);
      })
    )
  }

  ngOnInit() {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.service.getBook(this.selectedId);
      })
    )
  }
}
