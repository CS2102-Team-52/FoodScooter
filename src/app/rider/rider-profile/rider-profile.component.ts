import { Component, OnInit } from '@angular/core';
import { Rider } from '../rider';
import { RiderService } from 'src/app/services/users/rider/rider.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RiderFullTimeSchedule } from '../../store/rider-full-time-schedule';
import { RiderType } from 'src/app/store/rider-type.enum';

@Component({
  selector: 'app-rider-profile',
  templateUrl: './rider-profile.component.html',
  styleUrls: ['./rider-profile.component.css']
})
export class RiderProfileComponent implements OnInit {

  fullTimeForm: FormGroup;
  rider: Rider;
  isFullTime: boolean;
  riderFullTimeSchedule: RiderFullTimeSchedule = {
    dayOption: [1,2,3,4,5],
    shiftOption: [1,1,1,1,1]
  };

  dayChoices: any[] = [
    {value: 1, viewValue: 'Monday - Friday'},
    {value: 2, viewValue: 'Tuesday - Saturday'},
    {value: 3, viewValue: 'Wednesday - Sunday'},
    {value: 4, viewValue: 'Thursday - Monday'},
    {value: 5, viewValue: 'Friday - Tuesday'},
    {value: 6, viewValue: 'Saturday - Wednesday'},
    {value: 7, viewValue: 'Sunday - Thursday'}
  ];

  shiftChoices: any[] = [
    {value: 1, viewValue: '1000 - 1400 & 1500 - 1900'},
    {value: 2, viewValue: '1100 - 1500 & 1600 - 2000'},
    {value: 3, viewValue: '1200 - 1600 & 1700 - 2100'},
    {value: 4, viewValue: '1300 - 1700 & 1800 - 2200'}
  ];
  
  constructor(private riderService: RiderService, private fb: FormBuilder) { 
    this.fullTimeForm = fb.group({  
      'dayOption' : [null, Validators.required],  
      'shift1' : [null, Validators.required], 
      'shift2' : [null, Validators.required],  
      'shift3' : [null, Validators.required],  
      'shift4' : [null, Validators.required],  
      'shift5' : [null, Validators.required]
    });  
  }

  ngOnInit(): void {
    this.rider = this.riderService.getRider();
    this.checkFullTime();
    this.getRiderSchedule();
  }

  checkFullTime() {
    if (RiderType[this.rider.riderType] === RiderType.FULL_TIME) {
      this.isFullTime = true;
    } else {
      this.isFullTime = false;
    }
  }

  getRiderSchedule() {
    if (this.isFullTime) {
      this.riderService.fetchFullTimeSchedule(this.rider.id).subscribe((data: any) => {
        this.riderFullTimeSchedule = data;
      })
    } else {
      /*
      this.riderService.fetchPartTimeSchedule(this.rider.id).subscribe((data: any) => {
        this.riderFullTimeSchedule = data;
      })
      */
    }
  }

  onSubmitFullTime() {
    let dayArray:number[];
    switch( this.fullTimeForm.controls.dayOption.value) {
      case 1: 
        dayArray = [1,2,3,4,5]
        break;
      case 2: 
        dayArray = [2,3,4,5,6]
        break;
      case 3: 
        dayArray = [3,4,5,6,7]
        break;
      case 4: 
        dayArray = [4,5,6,7,1]
        break;
      case 5: 
        dayArray = [5,6,7,1,2]
        break;
      case 6: 
        dayArray = [6,7,1,2,3]
        break;
      case 7: 
        dayArray = [7,1,2,3,4]
        break;
    }

    this.riderFullTimeSchedule = {
      dayOption: dayArray,
      shiftOption: [
        this.fullTimeForm.controls.shift1.value,
        this.fullTimeForm.controls.shift2.value,
        this.fullTimeForm.controls.shift3.value,
        this.fullTimeForm.controls.shift4.value,
        this.fullTimeForm.controls.shift5.value
      ]
    };
    console.log(this.riderFullTimeSchedule);
    this.riderService.updateFullTimeSchedule(this.rider.id, this.riderFullTimeSchedule).subscribe((data: any) => {
      console.log(data);
      this.riderFullTimeSchedule = data;
    })
  }

  onSubmitPartTime() {

  }
}
