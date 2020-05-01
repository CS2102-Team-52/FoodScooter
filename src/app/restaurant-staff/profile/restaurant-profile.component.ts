import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../../store/restaurant';
import { RestaurantProfileService } from './services/restaurant-profile.service';

@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.css']
})
export class RestaurantProfileComponent implements OnInit {
  private restaurantId: number;

  profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    minimumPurchase: ['', Validators.required]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restaurantProfileService: RestaurantProfileService
  ) { }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.parent.snapshot.paramMap.get('restaurantId'));
    this.getDetails();
  }

  public getDetails() {
    this.restaurantProfileService.getRestaurant(this.restaurantId).subscribe(
      (data: Restaurant) => {
        this.profileForm.setValue({
          name: data.name,
          description: data.description,
          minimumPurchase: data.minimumPurchase
        })
      }
    );
  }

  public putDetails() {
    const restaurant: Restaurant = {
      id: this.restaurantId,
      name: this.profileForm.get('name').value,
      description: this.profileForm.get('description').value,
      minimumPurchase: this.profileForm.get('minimumPurchase').value
    }
    this.restaurantProfileService.patchRestaurant(this.restaurantId, restaurant).subscribe(_ => {});
  }
}
