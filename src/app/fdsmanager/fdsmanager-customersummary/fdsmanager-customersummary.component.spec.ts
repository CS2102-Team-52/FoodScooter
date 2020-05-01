import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FDSManagerCustomersummaryComponent } from './fdsmanager-customersummary.component';

describe('FdsmanagerCustomersummaryComponent', () => {
  let component: FDSManagerCustomersummaryComponent;
  let fixture: ComponentFixture<FDSManagerCustomersummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FDSManagerCustomersummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FDSManagerCustomersummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
