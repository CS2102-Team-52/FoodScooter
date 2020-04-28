import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantStaffComponent } from './restaurant-staff.component';

describe('RestaurantStaffComponent', () => {
  let component: RestaurantStaffComponent;
  let fixture: ComponentFixture<RestaurantStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
