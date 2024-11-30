import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { CreateFranchiseDto, UpdateFracchiseDto } from '../dtos/Franchise.dto';
import { Franchise } from '../models/Franchise.interface';

@Injectable({
  providedIn: 'root',
})
export class FranchisesService {
  private url = environment.apiURL + '/franchises';
  private http = inject(HttpClient);

  getAll = (page = 1, limit = 10) =>
    this.http.get(`${this.url}?page=${page}&limit=${limit}`);

  get = (id: Franchise['id']) => this.http.get(`${this.url}/${id}`);

  create = (dto: CreateFranchiseDto) => this.http.post(this.url, dto);

  update = (id: Franchise['id'], dto: UpdateFracchiseDto) =>
    this.http.put(`${this.url}/${id}`, dto);

  delete = (id: Franchise['id']) => this.http.delete(`${this.url}/${id}`);
}
