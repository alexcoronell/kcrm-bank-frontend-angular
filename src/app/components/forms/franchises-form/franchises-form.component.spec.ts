import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisesFormComponent } from './franchises-form.component';

describe('FranchisesFormComponent', () => {
  let component: FranchisesFormComponent;
  let fixture: ComponentFixture<FranchisesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchisesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchisesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
