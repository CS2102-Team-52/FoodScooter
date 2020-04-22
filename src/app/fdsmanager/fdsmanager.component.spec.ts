import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FDSManagerComponent } from './fdsmanager.component';

describe('FDSManagerComponent', () => {
  let component: FDSManagerComponent;
  let fixture: ComponentFixture<FDSManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FDSManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FDSManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
