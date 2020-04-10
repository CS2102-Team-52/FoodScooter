import { TestBed } from '@angular/core/testing';

import { CustomerFeedbackService } from './customer-feedback.service';

describe('CustomerFeedbackService', () => {
  let service: CustomerFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
