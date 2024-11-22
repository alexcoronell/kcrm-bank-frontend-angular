import {
  Component,
  inject,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../modules/material/material.module';

/* Services */
import { AuthStateService } from '../../../core/services/auth-state.service';
import { AuthService } from '../../../core/services/auth.service';

/* DTO'S */
import { LoginDto } from '../../../core/dtos/Login.dto';

/* Types */
import { RequestStatus } from '../../../core/types/RequestStatus.type';

/* Helpers */
import { MyErrorStateMatcher } from '../../../core/helpers/MyErrorStateMatcher.helper';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, MaterialModule],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  /****************************************** Services ******************************************/
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private authStateService = inject(AuthStateService);
  private router = inject(Router);

  /****************************************** Signal ******************************************/
  hide = signal(true);
  requestStatus = signal<RequestStatus>('init');
  errorRequest = signal('');

  /****************************************** Properties ******************************************/
  form: FormGroup;
  errorEmailFormControl = new MyErrorStateMatcher();
  errorPasswordFormControl = new MyErrorStateMatcher();

  /****************************************** Contructor ******************************************/
  constructor() {
    this.buildForm();
  }

  /****************************************** Methods ******************************************/
  /****** Build Form ******/
  private buildForm() {
    this.form = this.formBuilder.nonNullable.group({
      emailFormControl: [
        'jdoe@email.com',
        [Validators.required, Validators.email],
      ],
      passwordFormControl: ['12345678', [Validators.required]],
    });
  }

  /****** Show Or Hide Password ******/
  handleToggleShowPassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  /****** Do Login ******/
  doLogin() {
    if (!this.form.valid) return;
    this.requestStatus.set('loading');
    const dto: LoginDto = {
      email: this.form.get('emailFormControl')?.value,
      password: this.form.get('passwordFormControl')?.value,
    };
    this.authService.login(dto).subscribe({
      next: (response) => {
        this.requestStatus.set('success');
        const { user, isAdmin } = response as any;
        this.authStateService.login(user, isAdmin);
        this.router.navigate(['app']);
      },
      error: (e) => {
        this.requestStatus.set('failed');
        const { status } = e;
        if (status === 404) {
          this.errorRequest.set('Email o contraseña erroneos');
        } else {
          this.errorRequest.set('Intenta más tarde');
        }
        alert(this.errorRequest());
      },
    });
  }
}
