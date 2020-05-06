import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionEditorComponent } from './promotion-editor.component';

describe('PromotionEditorComponent', () => {
  let component: PromotionEditorComponent;
  let fixture: ComponentFixture<PromotionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
