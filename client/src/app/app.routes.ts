import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BookDetailsComponent } from './book-details/book-details.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'books/:id', component: BookDetailsComponent },
];