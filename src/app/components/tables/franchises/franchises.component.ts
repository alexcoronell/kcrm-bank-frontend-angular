import { Component, inject, signal, effect } from '@angular/core';

/* Modules */
import { MaterialModule } from '../../../modules/material/material.module';

/* Models */
import { Franchise } from '../../../core/models/Franchise.interface';

/* Services */
import { FranchisesService } from '../../../core/services/franchises.service';

/* Types */
import { RequestStatus } from '../../../core/types/RequestStatus.type';
import { ItemsResponse } from '../../../core/interfaces/ItemsResponse';
@Component({
  selector: 'app-franchises',
  imports: [MaterialModule],
  templateUrl: './franchises.component.html',
  styleUrl: './franchises.component.scss',
})
export class FranchisesComponent {
  /****************************************** Services ******************************************/
  private franchisesService = inject(FranchisesService);

  /****************************************** Signals ******************************************/
  dataSource = signal<Franchise[]>([]);
  requestStatus = signal<RequestStatus>('init');
  page = signal<number>(0);
  limit = signal<number>(10);
  total = signal<number>(0);

  /****************************************** Properties ******************************************/
  displayedColumns: string[] = ['id', 'name', 'createAt', 'updateAt', 'actions'];

  /****************************************** Constructor ******************************************/
  constructor() {
    effect(() => this.getAll(this.page(), this.limit()));
  }

  /****************************************** GetAll ******************************************/
  getAll(page: number, limit: number) {
    this.franchisesService.getAll(page, limit).subscribe({
      next: (res) => {
        const { items, count } = res as ItemsResponse;
        this.dataSource.set(items);
        this.total.set(count);
        console.log(items)
      },
      error: (err) => console.error(err),
    });
  }
}