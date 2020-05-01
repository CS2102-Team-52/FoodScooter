import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantStaffSpringBoardComponent } from './restaurant-staff-spring-board.component';

describe('RestaurantStaffSpringBoardComponent', () => {
  let component: RestaurantStaffSpringBoardComponent;
  let fixture: ComponentFixture<RestaurantStaffSpringBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantStaffSpringBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantStaffSpringBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
