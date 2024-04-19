import { TestBed } from '@angular/core/testing';

import { CarMakeService } from './car-make.service';

describe('CarMakeService', () => {
  let service: CarMakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarMakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
