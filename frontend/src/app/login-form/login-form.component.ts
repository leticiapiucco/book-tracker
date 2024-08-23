import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [AuthService],
})
export class LoginFormComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService // Injecting AuthService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!).subscribe(
        response => {
          console.log('Login successful:', response);
        },
        error => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}
