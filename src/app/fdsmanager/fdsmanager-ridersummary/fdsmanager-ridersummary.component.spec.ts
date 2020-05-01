import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FDSManagerRidersummaryComponent } from './fdsmanager-ridersummary.component';

describe('FdsmanagerRidersummaryComponent', () => {
  let component: FDSManagerRidersummaryComponent;
  let fixture: ComponentFixture<FDSManagerRidersummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FDSManagerRidersummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FDSManagerRidersummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
