import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantStaffService } from './services/restaurant-staff.service';

@Component({
  selector: 'app-restaurant-staff-spring-board',
  templateUrl: './restaurant-staff-spring-board.component.html',
  styleUrls: ['./restaurant-staff-spring-board.component.css']
})
export class RestaurantStaffSpringBoardComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restaurantStaffService: RestaurantStaffService
  ) { }

  ngOnInit(): void {
    const staffId: number = Number(this.activatedRoute.snapshot.paramMap.get('staffId'));
    const restaurantId = this.restaurantStaffService.getEmployingRestaurant(staffId);
    this.router.navigate(['restaurants/'], {relativeTo: this.activatedRoute}).then(_ => {});
  }
}
