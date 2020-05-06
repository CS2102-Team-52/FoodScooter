import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdsManagerCustomerSummaryComponent } from './fds-manager-customer-summary.component';

describe('FdsManagerCustomerSummaryComponent', () => {
  let component: FdsManagerCustomerSummaryComponent;
  let fixture: ComponentFixture<FdsManagerCustomerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdsManagerCustomerSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdsManagerCustomerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
