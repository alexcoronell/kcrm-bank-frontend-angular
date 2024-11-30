import {
  Component,
  Input,
  signal,
  OnChanges,
  SimpleChanges,
  inject,
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
})
export class FranchisesFormComponent implements OnChanges {
  /****************************************** Services ******************************************/
  private formBuilder = inject(FormBuilder);
  private franchisesService = inject(FranchisesService)

  @Input() id: Franchise['id'] | null = null;
  @Input() showFormInput = false;

  /****************************************** Signals ******************************************/
  requestStatus = signal<RequestStatus>('init');
  statusMode = signal<StatusMode>('create');
  showForm = signal<boolean>(false);

  /****************************************** Properties ******************************************/
  title = 'Crear Franquicia';
  form: FormGroup;
  errorNameFormControl = new MyErrorStateMatcher();

  /****************************************** Contructor ******************************************/
  constructor() {
    this.buildForm();
  }

  /****************************************** OnChanges ******************************************/
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue) {
      this.fetchData(changes['id'].currentValue);
      this.title = "Detalle de Franquicia"
    }
    if (changes['showFormInput'] && changes['showFormInput'].currentValue) {
      console.log(changes['showFormInput'].currentValue);
      this.showForm.set(changes['showFormInput'].currentValue);
    }
  }

  /****************************************** Methods ******************************************/
   /****** Build Form ******/
   private buildForm(){
    this.form = this.formBuilder.group({
      nameFormControl :['', [Validators.required]]
    })
   }

   /****** Fetch Data ******/
  fetchData(id: Franchise['id']) {
    console.log(id);
  }
}
