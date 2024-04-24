import { TestBed } from '@angular/core/testing';

import { NameCheckService } from './name-check.service';

describe('NameCheckService', () => {
  let service: NameCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
