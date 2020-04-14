import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderSummaryComponent } from './rider-summary.component';

describe('RiderSummaryComponent', () => {
  let component: RiderSummaryComponent;
  let fixture: ComponentFixture<RiderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
