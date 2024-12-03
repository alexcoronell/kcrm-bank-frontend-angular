import {
  Component,
  input,
  signal,
  inject,
  effect,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

/* Services */
import { FranchisesService } from "../../../core/services/franchises.service";
import { SnackMessageService } from '../../../core/services/snack-message.service';

/* Modules */
import { MaterialModule } from "../../../modules/material/material.module";

/* Componets */
import { LayoutFormComponent } from "../../layouts/layout-form/layout-form.component";

/* Models */
import { Franchise } from "../../../core/models/Franchise.interface";

/* DTO's */
import {
  CreateFranchiseDto,
  UpdateFracchiseDto,
} from "../../../core/dtos/Franchise.dto";

/* Types */
import { RequestStatus } from "../../../core/types/RequestStatus.type";
import { StatusMode } from "../../../core/types/StatusMode.type";

/* Helpers */
import { MyErrorStateMatcher } from "../../../core/helpers/MyErrorStateMatcher.helper";

@Component({
  selector: "app-franchises-form",
  imports: [LayoutFormComponent, ReactiveFormsModule, MaterialModule],
  templateUrl: "./franchises-form.component.html",
  styleUrl: "./franchises-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FranchisesFormComponent {
  /****************************************** Services ******************************************/
  private formBuilder = inject(FormBuilder);
  private franchisesService = inject(FranchisesService);
  private snackMessageService = inject(SnackMessageService);

  /****************************************** Inputs ******************************************/
  id = input<Franchise["id"] | null>(null);
  showForm = input<boolean>(false);

  /****************************************** Outputs ******************************************/
  @Output() refresh = new EventEmitter<void>();
  @Output() hideForm = new EventEmitter<void>();

  /****************************************** Signals ******************************************/
  requestStatus = signal<RequestStatus>("init");
  statusMode = signal<StatusMode>("create");
  franquise = signal<Franchise | null>(null);
  title = signal("Crear Franquicia");

  /****************************************** Properties ******************************************/
  form: FormGroup;
  errorNameFormControl = new MyErrorStateMatcher();

  /****************************************** Contructor ******************************************/
  constructor() {
    this.buildForm();
    effect(() => {
      const id = this.id();
      if (id) {
        this.fetchData();
        this.statusMode.set("detail");
      }
    });
  }

  /****************************************** Methods ******************************************/
  /****** Build Form ******/
  private buildForm() {
    this.form = this.formBuilder.group({
      nameFormControl: ["", [Validators.required]],
      activeFormControl: [false],
    });
  }

  /****** Fetch Data ******/
  fetchData() {
    this.requestStatus.set("loading");
    const id = this.id() as Franchise["id"];
    this.franchisesService.get(id).subscribe({
      next: (res) => {
        this.requestStatus.set("success");
        this.franquise.set(res as Franchise);
        this.patchData();
      },
      error: (err) => {
        this.requestStatus.set("failed");
        console.error(err);
      },
    });
  }

  /****** onSubmit ******/
  onSubmit() {
    if (!this.form.valid) return;
    this.requestStatus.set("loading");
    if (this.statusMode() === "create") {
      this.create();
    } else {
      this.update();
    }
  }

  /****** Create ******/
  create() {
    const dto: CreateFranchiseDto = {
      name: this.form.get("nameFormControl")?.value,
    };
    this.franchisesService.create(dto).subscribe({
      next: (res) => {
        console.log(res);
        this.requestStatus.set("success");
        this.clear();
        this.snackMessageService.success("Franquicia creada correctamente")
      },
      error: (err) => {
        console.log(err);
        this.requestStatus.set("failed");
        this.snackMessageService.error("Franquicia no pudo ser creada")
      },
    });
  }

  /****** Update ******/
  update() {
    const dto: UpdateFracchiseDto = {
      name: this.form.get("nameFormControl")?.value,
      active: this.form.get("activeFormControl")?.value,
    };
    this.franchisesService.update(this.id() as Franchise["id"], dto).subscribe({
      next: () => {
        this.requestStatus.set("success");
        this.fetchData();
        this.unsetEditMode()
        this.snackMessageService.success("Franquicia actualizada correctamente")
      },
      error: (err) => {
        console.error(err);
        this.requestStatus.set("failed");
        this.snackMessageService.error("Franquicia no pudo ser actualizada")
      },
    });
  }

  /****** Patch Data ******/
  patchData() {
    this.title.set("Detalle de Franquicia");
    this.form.patchValue({
      nameFormControl: this.franquise()?.name,
      activeFormControl: this.franquise()?.active,
    });
    this.form.controls["activeFormControl"].disable();
  }

  /****** set Edit Mode ******/
  setEditMode() {
    this.title.set("Editar Franquicia");
    this.statusMode.set("edit");
    this.form.controls["activeFormControl"].enable();
  }

  /****** unset Edit Mode ******/
  unsetEditMode() {
    this.statusMode.set("detail");
    this.patchData();
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
    this.refresh.emit();
    this.hideForm.emit();
    this.statusMode.set("create");
  }
}
