import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantPromotionsComponent } from './restaurant-promotions.component';

describe('RestaurantPromotionsComponent', () => {
  let component: RestaurantPromotionsComponent;
  let fixture: ComponentFixture<RestaurantPromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantPromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
