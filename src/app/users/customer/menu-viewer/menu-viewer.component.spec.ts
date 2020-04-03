import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViewer } from './menu-viewer.component';

describe('MenuViewerComponent', () => {
  let component: MenuViewer;
  let fixture: ComponentFixture<MenuViewer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuViewer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
