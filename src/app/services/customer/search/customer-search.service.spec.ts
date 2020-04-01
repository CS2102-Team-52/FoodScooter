import { TestBed } from '@angular/core/testing';

import { CustomerSearchService } from './customer-search.service';

describe('CustomerSearchService', () => {
  let service: CustomerSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
