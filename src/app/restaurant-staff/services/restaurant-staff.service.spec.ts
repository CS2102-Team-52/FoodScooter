import { TestBed } from '@angular/core/testing';

import { RestaurantStaffService } from './restaurant-staff.service';

describe('RestaurantStaffService', () => {
  let service: RestaurantStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
