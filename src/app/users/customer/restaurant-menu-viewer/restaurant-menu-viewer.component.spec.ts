import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuViewer } from './restaurant-menu-viewer.component';

describe('RestaurantMenuViewerComponent', () => {
  let component: RestaurantMenuViewer;
  let fixture: ComponentFixture<RestaurantMenuViewer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantMenuViewer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
