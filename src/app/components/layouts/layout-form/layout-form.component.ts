import { Component, input } from '@angular/core';

@Component({
  selector: 'app-layout-form',
  imports: [],
  templateUrl: './layout-form.component.html',
  styleUrl: './layout-form.component.scss'
})
export class LayoutFormComponent {
  title = input.required<string>()
}
