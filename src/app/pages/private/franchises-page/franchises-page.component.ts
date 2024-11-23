import { Component } from '@angular/core';
import { TableLayoutComponent } from '../../../components/layouts/table-layout/table-layout.component';
import { FranchisesComponent } from '../../../components/tables/franchises/franchises.component';

@Component({
  selector: 'app-franchises-page',
  imports: [TableLayoutComponent, FranchisesComponent],
  templateUrl: './franchises-page.component.html',
  styleUrl: './franchises-page.component.scss',
})
export class FranchisesPageComponent {
  titlePage = 'Franquicias';
}
