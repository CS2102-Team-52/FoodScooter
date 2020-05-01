import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderHistoryViewer } from './customer-order-history-viewer.component';

describe('OrdersViewerComponent', () => {
  let component: CustomerOrderHistoryViewer;
  let fixture: ComponentFixture<CustomerOrderHistoryViewer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderHistoryViewer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderHistoryViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
