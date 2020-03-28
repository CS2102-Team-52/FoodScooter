import { TestBed } from '@angular/core/testing';

import { RiderService } from './rider.service';

describe('RiderService', () => {
  let service: RiderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
