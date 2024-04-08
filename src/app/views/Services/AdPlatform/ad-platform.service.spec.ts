import { TestBed } from '@angular/core/testing';

import { AdPlatformService } from './ad-platform.service';

describe('AdPlatformService', () => {
  let service: AdPlatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdPlatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
