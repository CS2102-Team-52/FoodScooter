import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantViewer } from './restaurant-viewer.component';

describe('RestaurantViewerComponent', () => {
  let component: RestaurantViewer;
  let fixture: ComponentFixture<RestaurantViewer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantViewer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
