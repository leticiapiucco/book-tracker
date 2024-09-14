import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
];