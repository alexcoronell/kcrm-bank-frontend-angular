import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/public/login-page/login-page.component').then(
        (c) => c.LoginPageComponent
      ),
  },
  {
    path: 'app',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './pages/private/dashboard-page/dashboard-page.component'
          ).then((c) => c.DashboardPageComponent),
      },
      {
        path: 'franchises',
        loadComponent: () =>
          import(
            './pages/private/franchises-page/franchises-page.component'
          ).then((c) => c.FranchisesPageComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/private/products-page/products-page.component').then(
            (c) => c.ProductsPageComponent
          ),
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./pages/private/roles-page/roles-page.component').then(
            (c) => c.RolesPageComponent
          ),
      },
      {
        path: 'sales',
        loadComponent: () =>
          import('./pages/private/sales-page/sales-page.component').then(
            (c) => c.SalesPageComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/private/users-page/users-page.component').then(
            (c) => c.UsersPageComponent
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
