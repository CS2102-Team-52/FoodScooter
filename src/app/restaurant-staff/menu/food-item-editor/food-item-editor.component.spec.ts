import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemEditorComponent } from './food-item-editor.component';

describe('FoodItemEditorComponent', () => {
  let component: FoodItemEditorComponent;
  let fixture: ComponentFixture<FoodItemEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodItemEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
