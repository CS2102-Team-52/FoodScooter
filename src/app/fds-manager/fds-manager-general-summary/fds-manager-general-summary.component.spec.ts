import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdsManagerGeneralSummaryComponent } from './fds-manager-general-summary.component';

describe('FdsManagerGeneralSummaryComponent', () => {
  let component: FdsManagerGeneralSummaryComponent;
  let fixture: ComponentFixture<FdsManagerGeneralSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdsManagerGeneralSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdsManagerGeneralSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
