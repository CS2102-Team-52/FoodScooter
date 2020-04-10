import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantReviewsViewerComponent } from './restaurant-reviews-viewer.component';

describe('RestaurantReviewsViewerComponent', () => {
  let component: RestaurantReviewsViewerComponent;
  let fixture: ComponentFixture<RestaurantReviewsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantReviewsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantReviewsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
