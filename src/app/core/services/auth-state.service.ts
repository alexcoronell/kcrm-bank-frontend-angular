import { Injectable, signal } from '@angular/core';

interface CurrentUser {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
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
}
