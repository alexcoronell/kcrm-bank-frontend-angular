import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { CreateRoleDto, UpdateRoleDto } from '../dtos/Role.dto';
import { Role } from '../models/Role.interface';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private url = environment.apiURL + '/roles';
  private http = inject(HttpClient);

  getAll = async (page = 1, limit = 10) =>
    await this.http.get(`${this.url}?page=${page}&limit=${limit}`);

  get = async (id: Role['id']) => await this.http.get(`${this.url}/${id}`);

  create = async (dto: CreateRoleDto) => await this.http.post(this.url, dto);

  update = async (id: Role['id'], dto: UpdateRoleDto) =>
    this.http.put(`${this.url}/${id}`, dto);

  delete = async (id: Role['id']) => this.http.delete(`${this.url}/${id}`);
}
