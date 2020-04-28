import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewHistoryViewerComponent } from './customer-review-history-viewer.component';

describe('ReviewsViewerComponent', () => {
  let component: CustomerReviewHistoryViewerComponent;
  let fixture: ComponentFixture<CustomerReviewHistoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReviewHistoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReviewHistoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
