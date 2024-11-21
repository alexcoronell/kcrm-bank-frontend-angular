import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { CreateProductDto, UpdateProductDto } from '../dtos/Product.dto';
import { Product } from '../models/Product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = environment.apiURL + '/products';
  private http = inject(HttpClient);

  getAll = async (page = 1, limit = 10) =>
    await this.http.get(`${this.url}?page=${page}&limit=${limit}`);

  get = async (id: Product['id']) => await this.http.get(`${this.url}/${id}`);

  create = async (dto: CreateProductDto) => await this.http.post(this.url, dto);

  update = async (id: Product['id'], dto: UpdateProductDto) =>
    this.http.put(`${this.url}/${id}`, dto);

  delete = async (id: Product['id']) => this.http.delete(`${this.url}/${id}`);
}
