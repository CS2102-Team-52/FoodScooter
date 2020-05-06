import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdsManagerRiderSummaryComponent } from './fds-manager-rider-summary.component';

describe('FdsManagerRiderSummaryComponent', () => {
  let component: FdsManagerRiderSummaryComponent;
  let fixture: ComponentFixture<FdsManagerRiderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdsManagerRiderSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdsManagerRiderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
