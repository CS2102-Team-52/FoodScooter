import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FDSManagerGeneralsummaryComponent } from './fdsmanager-generalsummary.component';

describe('FdsmanagerGeneralsummaryComponent', () => {
  let component: FDSManagerGeneralsummaryComponent;
  let fixture: ComponentFixture<FDSManagerGeneralsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FDSManagerGeneralsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FDSManagerGeneralsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
