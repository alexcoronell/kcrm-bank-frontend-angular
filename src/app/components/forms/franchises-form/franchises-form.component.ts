import {
  Component,
  Input,
  signal,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

/* Componets */
import { LayoutFormComponent } from '../../layouts/layout-form/layout-form.component';

/* Models */
import { Franchise } from '../../../core/models/Franchise.interface';

/* Types */
import { RequestStatus } from '../../../core/types/RequestStatus.type';
import { StatusMode } from '../../../core/types/StatusMode.type';

@Component({
  selector: 'app-franchises-form',
  imports: [LayoutFormComponent],
  templateUrl: './franchises-form.component.html',
  styleUrl: './franchises-form.component.scss',
})
export class FranchisesFormComponent implements OnChanges {
  @Input() id: Franchise['id'] | null = null;
  @Input() showFormInput = false;
  requestStatus = signal<RequestStatus>('init');
  statusMode = signal<StatusMode>('create');
  showForm = signal<boolean>(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue) {
      this.fetchData(changes['id'].currentValue);
    }
    if (changes['showFormInput'] && changes['showFormInput'].currentValue) {
      console.log(changes['showFormInput'].currentValue)
      this.showForm.set(changes['showFormInput'].currentValue);
    }
  }

  fetchData(id: Franchise['id']) {
    console.log(id);
  }
}
