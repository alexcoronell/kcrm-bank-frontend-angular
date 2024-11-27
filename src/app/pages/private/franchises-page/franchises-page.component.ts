import { Component } from '@angular/core';
import { TableLayoutComponent } from '../../../components/layouts/table-layout/table-layout.component';
import { TableButtonsComponent } from '../../../components/layouts/table-buttons/table-buttons.component';
import { FranchisesComponent } from '../../../components/tables/franchises/franchises.component';

@Component({
  selector: 'app-franchises-page',
  imports: [TableLayoutComponent, TableButtonsComponent, FranchisesComponent],
  templateUrl: './franchises-page.component.html',
  styleUrl: './franchises-page.component.scss',
})
export class FranchisesPageComponent {
  titlePage = 'Franquicias';
}
