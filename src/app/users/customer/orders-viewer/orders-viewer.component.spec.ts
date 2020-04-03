import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersViewerComponent } from './orders-viewer.component';

describe('OrdersViewerComponent', () => {
  let component: OrdersViewerComponent;
  let fixture: ComponentFixture<OrdersViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
