import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { CreateFranchiseDto, UpdateFracchiseDto } from '../dtos/Franchise.dto';
import { Franchise } from '../models/Franchise.interface';

@Injectable({
  providedIn: 'root',
})
export class FranchisesService {
  private url = environment.apiURL;
  private http = inject(HttpClient);

  getAll = async (page = 1, limit = 10) =>
    await this.http.get(`${this.url}?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });

  get = async (id: Franchise['id']) =>
    await this.http.get(`${this.url}/${id}`, { withCredentials: true });

  create = async (dto: CreateFranchiseDto) =>
    await this.http.post(`url`, dto, { withCredentials: true });

  update = async (id: Franchise['id'], dto: UpdateFracchiseDto) =>
    await this.http.put(`${this.url}/${id}`, dto, { withCredentials: true });

  delete = async (id: Franchise['id']) =>
    await this.http.delete(`${this.url}/${id}`, { withCredentials: true });
}
