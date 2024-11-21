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
import { MaterialModule } from '../../../modules/material/material.module';

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

  /****************************************** Signal ******************************************/
  hide = signal(true);

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
      emailFormControl: ['', [Validators.required, Validators.email]],
      passwordFormControl: ['', [Validators.required]],
    });
  }

  /****** Show Or Hide Password ******/
  handleToggleShowPassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
