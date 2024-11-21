import { Component } from '@angular/core';

/* Components */
import { LoginFormComponent } from '../../../components/forms/login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
