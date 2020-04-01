import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRestaurantViewerComponent } from './customer-restaurant-viewer.component';

describe('RestaurantViewerComponent', () => {
  let component: CustomerRestaurantViewerComponent;
  let fixture: ComponentFixture<CustomerRestaurantViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRestaurantViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRestaurantViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
