import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout-form',
  imports: [],
  templateUrl: './layout-form.component.html',
  styleUrl: './layout-form.component.scss'
})
export class LayoutFormComponent {
  @Input() title: string;

}
