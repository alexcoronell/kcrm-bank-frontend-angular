import { Component, inject, signal, OnInit, effect } from '@angular/core';

/* Models */
import { Franchise } from '../../../core/models/Franchise.interface';

/* Services */
import { FranchisesService } from '../../../core/services/franchises.service';

/* Types */
import { RequestStatus } from '../../../core/types/RequestStatus.type';
import { ItemsResponse } from '../../../core/interfaces/ItemsResponse';
@Component({
  selector: 'app-franchises',
  imports: [],
  templateUrl: './franchises.component.html',
  styleUrl: './franchises.component.scss',
})
export class FranchisesComponent implements OnInit {
  /****************************************** Services ******************************************/
  private franchisesService = inject(FranchisesService);

  /****************************************** Signals ******************************************/
  franquises = signal<Franchise[]>([]);
  requestStatus = signal<RequestStatus>('init');
  page = signal<number>(0);
  limit = signal<number>(10);
  total = signal<number>(0);

  /****************************************** Constructor ******************************************/
  constructor() {
    effect(() => this.getAll(this.page(), this.limit()));
  }

  /****************************************** GetAll ******************************************/
  getAll(page: number, limit: number) {
    this.franchisesService.getAll().subscribe({
      next: (res) => {
        const { items, count } = res as ItemsResponse;
        this.franquises.set(items);
        this.total.set(count);
        console.log(this.franquises())
      },
      error: (err) => console.error(err),
    });
  }
}
