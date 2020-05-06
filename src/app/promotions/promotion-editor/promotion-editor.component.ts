import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PromotionEditMode } from './promotion-edit-mode.enum';
import { Promotion } from '../promotion';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PromotionsService } from '../services/promotions.service';
import { PromotionType } from '../promotion-type';

@Component({
  selector: 'app-promotion-editor',
  templateUrl: './promotion-editor.component.html',
  styleUrls: ['./promotion-editor.component.css']
})
export class PromotionEditorComponent implements OnInit {
  @Input() restaurantId: number;
  @Input() promotionType: PromotionType;
  @Input() mode: PromotionEditMode;
  @Input() promotion: Promotion;

  @Output() promotionResult: EventEmitter<Promotion>;

  promotionForm = this.formBuilder.group({
    name: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    discount: ['', Validators.required]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private promotionsService: PromotionsService
  ) {
    this.promotionResult = new EventEmitter<Promotion>();
  }

  ngOnInit(): void {
    if (this.mode == PromotionEditMode.UPDATE) {
      this.promotionForm.setValue({
        name: this.promotion.name,
        startDate: this.promotion.startDate,
        endDate: this.promotion.endDate,
        discount: this.promotion.discount
      });
    }
  }

  public submit() {
    const promotion: Promotion = {
      id: this.promotion == undefined ? null : this.promotion.id,
      name: this.promotionForm.get('name').value,
      startDate: this.promotionForm.get('startDate').value,
      endDate: this.promotionForm.get('endDate').value,
      type: this.promotionType,
      discount: this.promotionForm.get('discount').value
    };
    console.log(promotion);
    let action: Observable<Object>;
    switch (this.mode) {
      case PromotionEditMode.ADD:
        action = this.promotionsService.addPromotion(this.restaurantId, promotion);
        break;
      case PromotionEditMode.UPDATE:
        action = this.promotionsService.updatePromotion(this.restaurantId, promotion);
        break;
      default:
      // will not reach here
    }
    return action.subscribe(_ => this.promotionResult.emit(promotion));
  }
}
