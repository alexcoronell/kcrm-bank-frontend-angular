import { Component, ViewChild } from '@angular/core';
import { TableLayoutComponent } from '../../../components/layouts/table-layout/table-layout.component';
import { TableButtonsComponent } from '../../../components/layouts/table-buttons/table-buttons.component';
import { FranchisesComponent } from '../../../components/tables/franchises/franchises.component';
import { FranchisesFormComponent } from '../../../components/forms/franchises-form/franchises-form.component';

@Component({
  selector: 'app-franchises-page',
  imports: [TableLayoutComponent, TableButtonsComponent, FranchisesComponent, FranchisesFormComponent],
  templateUrl: './franchises-page.component.html',
  styleUrl: './franchises-page.component.scss',
})
export class FranchisesPageComponent {
  titlePage = 'Franquicias';
  @ViewChild('franchisesComponent') franchisesComponent: FranchisesComponent;

  refresh(){
    this.franchisesComponent.getAll()
  }
}
