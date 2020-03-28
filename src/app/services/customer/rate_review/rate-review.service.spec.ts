import { TestBed } from '@angular/core/testing';

import { RateReviewService } from './rate-review.service';

describe('RateReviewService', () => {
  let service: RateReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
