import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdsManagerPromotionsComponent } from './fds-manager-promotions.component';

describe('FdsManagerPromotionsComponent', () => {
  let component: FdsManagerPromotionsComponent;
  let fixture: ComponentFixture<FdsManagerPromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdsManagerPromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdsManagerPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
