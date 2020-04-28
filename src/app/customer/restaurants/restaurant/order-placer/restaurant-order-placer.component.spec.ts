import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOrderPlacerComponent } from './restaurant-order-placer.component';

describe('RestaurantOrderPlacerComponent', () => {
  let component: RestaurantOrderPlacerComponent;
  let fixture: ComponentFixture<RestaurantOrderPlacerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantOrderPlacerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantOrderPlacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
