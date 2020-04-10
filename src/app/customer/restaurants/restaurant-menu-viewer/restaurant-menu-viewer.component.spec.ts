import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuViewerComponent } from './restaurant-menu-viewer.component';

describe('RestaurantMenuViewerComponent', () => {
  let component: RestaurantMenuViewerComponent;
  let fixture: ComponentFixture<RestaurantMenuViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantMenuViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
