import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdsManagerComponent } from './fds-manager.component';

describe('FdsManagerComponent', () => {
  let component: FdsManagerComponent;
  let fixture: ComponentFixture<FdsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
