import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { CreateSaleDto, UpdateSaleDto } from '../dtos/Sale.dto';
import { Sale } from '../models/Sale.interface';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private url = environment.apiURL + '/sales';
  private http = inject(HttpClient);

  getAll = async (page = 1, limit = 10) =>
    await this.http.get(`${this.url}?page=${page}&limit=${limit}`);

  get = async (id: Sale['id']) => await this.http.get(`${this.url}/${id}`);

  create = async (dto: CreateSaleDto) => await this.http.post(this.url, dto);

  update = async (id: Sale['id'], dto: UpdateSaleDto) =>
    this.http.put(`${this.url}/${id}`, dto);

  delete = async (id: Sale['id']) => this.http.delete(`${this.url}/${id}`);
}
