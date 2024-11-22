import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import type { LoginDto } from '../dtos/Login.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.apiURL}/auth`;

  private http = inject(HttpClient);

  login = (dto: LoginDto) => this.http.post(`${this.url}/login`, dto);

  logout = () => this.http.get(`${this.url}/logout`);

  verifySession = () => this.http.get(`${this.url}/verify-session`);
}
