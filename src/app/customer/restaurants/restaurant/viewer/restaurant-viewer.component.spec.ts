import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantViewerComponent } from './restaurant-viewer.component';

describe('RestaurantViewerComponent', () => {
  let component: RestaurantViewerComponent;
  let fixture: ComponentFixture<RestaurantViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
