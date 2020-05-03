import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FDSManagerLocationsummaryComponent } from './fdsmanager-locationsummary.component';

describe('FdsmanagerLocationsummaryComponent', () => {
  let component: FDSManagerLocationsummaryComponent;
  let fixture: ComponentFixture<FDSManagerLocationsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FDSManagerLocationsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FDSManagerLocationsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
