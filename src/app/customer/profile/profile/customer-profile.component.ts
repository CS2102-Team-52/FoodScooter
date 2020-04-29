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

  customerProfile: CustomerProfile;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileService: CustomerProfileService
  ) { }

  ngOnInit(): void {
    this.customerId = Number(this.activatedRoute.parent.snapshot.paramMap.get(`customerId`));
    this.getDetails();
  }

  public getDetails() {
    this.profileService.getDetails(this.customerId).subscribe(
      (data: CustomerProfile) => {
        console.log(data);
        this.customerProfile = data;
        this.profileForm.get('username').setValue(this.customerProfile.username);
        this.profileForm.get('password').setValue('');
        this.profileForm.get('creditCardNumber').setValue(this.customerProfile.creditCardNumber);
      }
    )
  }

  public putDetails() {
    this.profileService.putDetails(this.customerId, this.customerProfile).subscribe(_ => {})
  }
}
