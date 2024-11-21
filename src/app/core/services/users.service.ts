import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { CreateUserDto, UpdateUserDto } from '../dtos/User.dto';
import { User } from '../models/User,interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = environment.apiURL + '/users';
  private http = inject(HttpClient);

  getAll = async (page = 1, limit = 10) =>
    await this.http.get(`${this.url}?page=${page}&limit=${limit}`);

  get = async (id: User['id']) => await this.http.get(`${this.url}/${id}`);

  create = async (dto: CreateUserDto) => await this.http.post(this.url, dto);

  update = async (id: User['id'], dto: UpdateUserDto) =>
    this.http.put(`${this.url}/${id}`, dto);

  delete = async (id: User['id']) => this.http.delete(`${this.url}/${id}`);
}
