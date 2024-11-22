import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/* Modules */
import { MaterialModule } from '../../modules/material/material.module';

@Component({
  selector: 'app-menu',
  imports: [MaterialModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

}
