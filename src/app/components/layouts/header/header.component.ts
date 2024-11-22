import { Component, inject, type OnInit } from '@angular/core';

/* Modules */
import { MaterialModule } from '../../../modules/material/material.module';

/* Services */
import { AuthStateService } from '../../../core/services/auth-state.service';

@Component({
  selector: 'app-header',
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  authStateService = inject(AuthStateService)

  ngOnInit(): void {
    this.authStateService.verifySession()
  }
}
