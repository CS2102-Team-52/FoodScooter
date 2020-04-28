import { TestBed } from '@angular/core/testing';

import { CustomerOrderHistoryService } from './customer-order-history.service';

describe('CustomerOrderHistoryService', () => {
  let service: CustomerOrderHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOrderHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
