import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsViewerComponent } from './restaurants-viewer.component';

describe('RestaurantsViewerComponent', () => {
  let component: RestaurantsViewerComponent;
  let fixture: ComponentFixture<RestaurantsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
