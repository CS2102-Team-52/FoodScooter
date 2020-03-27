import { TestBed } from '@angular/core/testing';

import { CustomerRestaurantService } from './customer-restaurant.service';

describe('CustomerRestaurantService', () => {
  let service: CustomerRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
