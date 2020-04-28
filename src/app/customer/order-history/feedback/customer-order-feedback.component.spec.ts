import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderFeedbackComponent } from './customer-order-feedback.component';

describe('OrderFeedbackComponent', () => {
  let component: CustomerOrderFeedbackComponent;
  let fixture: ComponentFixture<CustomerOrderFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
