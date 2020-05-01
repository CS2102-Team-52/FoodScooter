import { TestBed } from '@angular/core/testing';

import { CustomerReviewHistoryService } from './customer-review-history.service';

describe('CustomerReviewHistoryService', () => {
  let service: CustomerReviewHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerReviewHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
