import { TestBed } from '@angular/core/testing';

import { RiderOrderService } from './rider-order.service';

describe('RiderOrderService', () => {
  let service: RiderOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiderOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
