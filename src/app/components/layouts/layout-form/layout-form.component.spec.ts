import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFormComponent } from './layout-form.component';

describe('LayoutFormComponent', () => {
  let component: LayoutFormComponent;
  let fixture: ComponentFixture<LayoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
