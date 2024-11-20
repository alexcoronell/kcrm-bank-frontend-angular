import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisesPageComponent } from './franchises-page.component';

describe('FranchisesPageComponent', () => {
  let component: FranchisesPageComponent;
  let fixture: ComponentFixture<FranchisesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchisesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchisesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
