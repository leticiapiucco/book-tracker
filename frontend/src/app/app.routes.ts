import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'home', component: SearchResultsComponent },
    { path: 'books/:id', component: BookDetailsComponent },
];