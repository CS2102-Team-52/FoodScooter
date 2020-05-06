import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdsManagerLocationSummaryComponent } from './fds-manager-location-summary.component';

describe('FdsManagerLocationSummaryComponent', () => {
  let component: FdsManagerLocationSummaryComponent;
  let fixture: ComponentFixture<FdsManagerLocationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdsManagerLocationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdsManagerLocationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
