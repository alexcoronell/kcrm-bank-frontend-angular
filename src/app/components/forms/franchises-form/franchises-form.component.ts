import {
  Component,
  input,
  signal,
  inject,
  effect,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

/* Services */
import { FranchisesService } from '../../../core/services/franchises.service';

/* Modules */
import { MaterialModule } from '../../../modules/material/material.module';

/* Componets */
import { LayoutFormComponent } from '../../layouts/layout-form/layout-form.component';

/* Models */
import { Franchise } from '../../../core/models/Franchise.interface';

/* DTO's */
import {
  CreateFranchiseDto,
  UpdateFracchiseDto,
} from '../../../core/dtos/Franchise.dto';

/* Types */
import { RequestStatus } from '../../../core/types/RequestStatus.type';
import { StatusMode } from '../../../core/types/StatusMode.type';

/* Helpers */
import { MyErrorStateMatcher } from '../../../core/helpers/MyErrorStateMatcher.helper';

@Component({
  selector: 'app-franchises-form',
  imports: [LayoutFormComponent, ReactiveFormsModule, MaterialModule],
  templateUrl: './franchises-form.component.html',
  styleUrl: './franchises-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FranchisesFormComponent {
  /****************************************** Services ******************************************/
  private formBuilder = inject(FormBuilder);
  private franchisesService = inject(FranchisesService);

  /****************************************** Inputs ******************************************/
  id = input<Franchise['id'] | null>(null);
  showForm = input<boolean>(false);

  /****************************************** Outputs ******************************************/
  @Output() hideForm = new EventEmitter();

  /****************************************** Signals ******************************************/
  requestStatus = signal<RequestStatus>('init');
  statusMode = signal<StatusMode>('create');
  franquise = signal<Franchise | null>(null);

  /****************************************** Properties ******************************************/
  title = 'Crear Franquicia';
  form: FormGroup;
  errorNameFormControl = new MyErrorStateMatcher();

  /****************************************** Contructor ******************************************/
  constructor() {
    this.buildForm();
    effect(() => {
      const id = this.id();
      if (id) {
        this.fetchData(id);
        this.title = 'Detalle de Franquicia';
        this.statusMode.set('detail');
        this.form.controls['activeFormControl'].disable()
      }
    });
  }

  /****************************************** Methods ******************************************/
  /****** Build Form ******/
  private buildForm() {
    this.form = this.formBuilder.group({
      nameFormControl: ['', [Validators.required]],
      activeFormControl: [false]
    });
  }

  /****** Fetch Data ******/
  fetchData(id: Franchise['id']) {
    this.requestStatus.set('loading');
    this.franchisesService.get(id).subscribe({
      next: (res) => {
        this.requestStatus.set('success');
        this.franquise.set(res as Franchise)
        this.form.patchValue({
          nameFormControl: this.franquise()?.name,
          activeFormControl: this.franquise()?.active
        })
      },
      error: (err) => {
        this.requestStatus.set('failed');
        console.error(err);
      },
    });
  }

  /****** onSubmit ******/
  onSubmit() {
    if (!this.form.valid) return;
    this.requestStatus.set('loading');
    if (this.statusMode() === 'create') {
      const dto: CreateFranchiseDto = {
        name: this.form.get('nameFormControl')?.value,
      };
      this.franchisesService.create(dto).subscribe({
        next: (res) => {
          console.log(res);
          this.requestStatus.set('success');
          this.clear();
        },
        error: (err) => {
          console.log(err);
          this.requestStatus.set('failed');
        },
      });
    }
  }

  /****** Clear Form ******/
  clear() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }

  /****** Close Form ******/
  close() {
    this.clear();
    this.hideForm.emit();
    this.statusMode.set('create')
  }
}
