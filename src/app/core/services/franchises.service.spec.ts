import { TestBed } from '@angular/core/testing';

import { FranchisesService } from './franchises.service';

describe('FranchisesService', () => {
  let service: FranchisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FranchisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
