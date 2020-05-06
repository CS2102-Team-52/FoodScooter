import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionEditMode } from './promotion-editor/promotion-edit-mode.enum';
import { Promotion } from './promotion';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PromotionsService } from './services/promotions.service';
import { PromotionType } from './promotion-type';
import { FoodItem } from '../customer/restaurants/restaurant/food-item';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  private restaurantId: number;

  @Input() promotionType: PromotionType;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  promotionsColumns: string[] = ['select', 'name', 'start date', 'end date', 'discount'];
  promotionsDataSource: MatTableDataSource<Promotion>;
  selectedPromotions = new SelectionModel<Promotion>(true, []);

  promotionEditorMode: PromotionEditMode;
  toShowPromotionEditor: boolean;
  promotionToUpdate: Promotion;

  constructor(
    private activatedRoute: ActivatedRoute,
    private promotionsService: PromotionsService
  ) {
    this.toShowPromotionEditor = false;
  }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.parent.snapshot.paramMap.get('restaurantId'));
    this.populatePromotions();
  }

  public populatePromotions() {
    this.promotionsService.fetchPromotions(this.restaurantId).subscribe(
      (data: Promotion[]) => {
        console.log(data);
        this.promotionsDataSource = new MatTableDataSource<Promotion>(data);
        this.promotionsDataSource.sort = this.sort;
      });
  }

  filterPromotions(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.promotionsDataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selectedPromotions.selected.length;
    const numRows = this.promotionsDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selectedPromotions.clear() :
      this.promotionsDataSource.data.forEach(row => this.selectedPromotions.select(row));
  }

  addPromotion() {
    this.promotionEditorMode = PromotionEditMode.ADD;
    this.toShowPromotionEditor = true;
  }

  updatePromotion() {
    this.promotionEditorMode = PromotionEditMode.UPDATE;
    this.promotionToUpdate = this.selectedPromotions.selected[0];
    this.toShowPromotionEditor = true;
    this.selectedPromotions.clear();
  }

  removePromotion() {
    const promotionsToRemove: Promotion[] = this.selectedPromotions.selected;
    this.selectedPromotions.clear();
    console.log(promotionsToRemove);
    for (const promotionToRemove of promotionsToRemove) {
      this.promotionsDataSource = new MatTableDataSource<Promotion>(
        this.promotionsDataSource.data.filter(promotion => promotion != promotionToRemove)
      )
    }
    this.promotionsService.removeRestaurantPromotion(
      this.restaurantId,
      promotionsToRemove.map(promotion => promotion.id)
    ).subscribe(_ => {});
  }

  handlePromotionEditorCompletion(event: any) {
    this.toShowPromotionEditor = false;
    const promotion: Promotion = event as Promotion;
    const data = this.promotionsDataSource.data;
    if (promotion.id == null) {
      data.push(promotion);
      this.promotionsDataSource.data = data;
    } else {
      const updatedMenu = [];
      data.forEach(p => {
        if (p.id == promotion.id) {
          p = promotion;
        }
        updatedMenu.push(p);
      });
      this.promotionsDataSource.data = updatedMenu;
    }
  }
}
