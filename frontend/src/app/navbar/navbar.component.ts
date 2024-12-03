import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilKeyChanged, map, switchMap, tap } from 'rxjs';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false
  isProfileMenuOpen = false
  searchForm = new FormGroup({
    searchControl: new FormControl('', { nonNullable: true }),
  });
  books$ = this.searchForm.valueChanges.pipe(
    debounceTime(300),
    distinctUntilKeyChanged('searchControl'),
    map((config) => {
      const trimmedConfig = {
        ...config,
        searchTerm: config.searchControl?.trim() || '', 
      };
      return trimmedConfig;
    }),
    tap((trimmedConfig) => localStorage.setItem('searchConfig', JSON.stringify(trimmedConfig)))).pipe(
    switchMap(async (searchTerm) => this.booksService.search(searchTerm.searchTerm)))

  showHideMenu(){
    this.isMenuOpen = !this.isMenuOpen
  }
  showHideProfileMenu(){
    this.isProfileMenuOpen = !this.isProfileMenuOpen
  }
  constructor(private booksService : BooksService){

  }
}
