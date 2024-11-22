import { Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

/* Modules */
import { MaterialModule } from './modules/material/material.module';

/* Components */
import { FooterComponent } from './components/layouts/footer/footer.component';

/* Services */
import { AuthStateService } from './core/services/auth-state.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MaterialModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authStateService = inject(AuthStateService);
  authService = inject(AuthService);
  showFiller = false;

  ngOnInit(): void {
    this.authStateService.verifySession();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.authStateService.logout(),
      error: (err) => console.error(err),
    });
  }
}
