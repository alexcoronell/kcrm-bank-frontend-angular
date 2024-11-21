import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { LoginDto } from '../dtos/Login.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiURL;

  private http = inject(HttpClient);

  login = async (dto: LoginDto) =>
    await this.http.post(`${this.url}/login`, dto, { withCredentials: true });

  logout = async () =>
    await this.http.get(`${this.url}/logout`, { withCredentials: true });

  verifySession = async () =>
    await this.http.get(`${this.url}/verify-sesion`, { withCredentials: true });
}
