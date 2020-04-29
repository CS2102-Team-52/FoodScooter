import { Component, OnInit } from '@angular/core';
import { CustomerProfileService } from '../services/customer-profile.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerProfile } from '../customer-profile';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  private customerId: number;

  profileForm = this.formBuilder.group({
    username: [''],
    password: [''],
    creditCardNumber: ['']
  });

  rewardPoints: number;
  recentDeliveryLocations: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileService: CustomerProfileService
  ) { }

  ngOnInit(): void {
    this.customerId = Number(this.activatedRoute.parent.snapshot.paramMap.get(`customerId`));
    this.rewardPoints = 0;
    this.recentDeliveryLocations = [];
    this.getDetails();
  }

  public getDetails() {
    this.profileService.getDetails(this.customerId).subscribe(
      (data: CustomerProfile) => {
        console.log(data);
        this.profileForm.get('username').setValue(data.username);
        this.profileForm.get('password').setValue('');
        this.profileForm.get('creditCardNumber').setValue(data.creditCardNumber);
        this.rewardPoints = data.rewardPoints;
        this.recentDeliveryLocations = data.recentDeliveryLocations;
      }
    )
  }

  public putDetails() {
    const customerProfile: CustomerProfile = {
      username: this.profileForm.get('username').value,
      password: this.profileForm.get('password').value,
      creditCardNumber: this.profileForm.get('creditCardNumber').value,
      rewardPoints: this.rewardPoints,
      recentDeliveryLocations: this.recentDeliveryLocations
    }
    this.profileService.putDetails(this.customerId, customerProfile).subscribe(_ => {})
  }
}
