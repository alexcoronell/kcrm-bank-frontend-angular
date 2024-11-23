import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-layout',
  imports: [],
  templateUrl: './table-layout.component.html',
  styleUrl: './table-layout.component.scss'
})
export class TableLayoutComponent {
  @Input() titlePage: string;

}
