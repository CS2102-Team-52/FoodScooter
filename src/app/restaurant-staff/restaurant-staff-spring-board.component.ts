import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantStaffService } from './services/restaurant-staff.service';
import { Restaurant } from '../store/restaurant';

@Component({
  selector: 'app-restaurant-staff-spring-board',
  templateUrl: './restaurant-staff-spring-board.component.html',
  styleUrls: ['./restaurant-staff-spring-board.component.css']
})
export class RestaurantStaffSpringBoardComponent implements OnInit {
  private restaurantId;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restaurantStaffService: RestaurantStaffService
  ) { }

  ngOnInit(): void {
    const staffId: number = Number(this.activatedRoute.snapshot.paramMap.get('staffId'));
    this.restaurantStaffService.getEmployingRestaurant(staffId).subscribe(
      (data: Restaurant) => {
        this.restaurantId = data.id;
        this.router.navigate([`restaurants/${this.restaurantId}`], {relativeTo: this.activatedRoute}).then(_ => {});
      });
  }
}
