import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerProfile } from '../customer-profile';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  customerProfile: CustomerProfile;

  customerId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService
  ) {
    this.customerProfile = {
      username: '',
      password: '',
      creditCardNumber: '',
      rewardPoints: 0,
      recentPlaces: []
    };
  }

  ngOnInit(): void {
    this.customerId = Number(this.activatedRoute.snapshot.paramMap.get(`customerId`));
    this.getDetails();
  }

  public getDetails() {
    console.log(this.customerId);
    this.profileService.getDetails(this.customerId).subscribe(
      (data: CustomerProfile) => {
        console.log(data);
        this.customerProfile = data;
      }
    )
  }

  public putDetails() {
    this.profileService.putDetails(this.customerId, this.customerProfile).subscribe(_ => {})
  }
}
