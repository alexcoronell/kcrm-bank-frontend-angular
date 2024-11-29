import { Component, ViewChild, signal } from '@angular/core';
import { TableLayoutComponent } from '../../../components/layouts/table-layout/table-layout.component';
import { TableButtonsComponent } from '../../../components/layouts/table-buttons/table-buttons.component';
import { FranchisesComponent } from '../../../components/tables/franchises/franchises.component';
import { FranchisesFormComponent } from '../../../components/forms/franchises-form/franchises-form.component';

/* Models */
import { Franchise } from '../../../core/models/Franchise.interface';

@Component({
  selector: 'app-franchises-page',
  imports: [
    TableLayoutComponent,
    TableButtonsComponent,
    FranchisesComponent,
    FranchisesFormComponent,
  ],
  templateUrl: './franchises-page.component.html',
  styleUrl: './franchises-page.component.scss',
})
export class FranchisesPageComponent {
  titlePage = 'Franquicias';
  @ViewChild('franchisesComponent') franchisesComponent: FranchisesComponent;
  id = signal<Franchise['id'] | null>(null);
  showForm = signal<boolean>(false);

  refresh() {
    this.franchisesComponent.getAll();
  }

  handleShowForm(id: Franchise['id'] | null = null) {
    this.showForm.set(true);
    this.id.set(id);
  }

  handleHideForm() {
    this.showForm.set(false);
    this.id.set(null);
  }
}
