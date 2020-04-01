import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFoodItemViewerComponent } from './customer-food-item-viewer.component';

describe('FoodItemViewerComponent', () => {
  let component: CustomerFoodItemViewerComponent;
  let fixture: ComponentFixture<CustomerFoodItemViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFoodItemViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFoodItemViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
