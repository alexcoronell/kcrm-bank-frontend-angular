import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import type { CurrentUser } from '../interfaces/CurrentUser.interface';
import type { AuthResponse } from '../interfaces/AuthResponse';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private authService = inject(AuthService);
  private router = inject(Router);
  private userSignal = signal<CurrentUser | null>(null);
  private isAdmin = signal<boolean>(false);
  private logged = signal<boolean>(false);

  get currentUser() {
    return this.userSignal();
  }

  get admin() {
    return this.isAdmin();
  }

  get isLogged() {
    return this.logged();
  }

  login(user: CurrentUser, isAdmin: boolean): void {
    this.userSignal.set(user);
    this.isAdmin.set(isAdmin);
    this.logged.set(true);
  }

  logout(): void {
    this.userSignal.set(null);
    this.isAdmin.set(false);
    this.logged.set(false);
  }

  verifySession = () => {
    this.authService.verifySession().subscribe({
      next: (res) => {
        const { user, isAdmin } = res as AuthResponse;
        this.login(user, isAdmin);
        this.router.navigate(['app']);
      },
      error: (err) => {
        this.router.navigate(['/login']);
      },
    });
  };
}
