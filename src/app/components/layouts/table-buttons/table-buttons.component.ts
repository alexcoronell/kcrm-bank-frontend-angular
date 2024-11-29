import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';

@Component({
  selector: 'app-table-buttons',
  imports: [MaterialModule],
  templateUrl: './table-buttons.component.html',
  styleUrl: './table-buttons.component.scss',
})
export class TableButtonsComponent {
  @Output() refresh = new EventEmitter<void>();
  @Output() showForm = new EventEmitter<void>();

  onRefresh() {
    this.refresh.emit();
  }

  handleShowForm() {
    this.showForm.emit();
  }
}
