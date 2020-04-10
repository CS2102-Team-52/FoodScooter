import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsViewerComponent } from './reviews-viewer.component';

describe('ReviewsViewerComponent', () => {
  let component: ReviewsViewerComponent;
  let fixture: ComponentFixture<ReviewsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
