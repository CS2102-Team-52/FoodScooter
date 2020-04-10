import { TestBed } from '@angular/core/testing';

import { ReviewHistoryService } from './review-history.service';

describe('ReviewHistoryService', () => {
  let service: ReviewHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
