import { Component, OnInit } from '@angular/core';
import { Rider } from '../rider';
import { RiderService } from 'src/app/services/users/rider/rider.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RiderFullTimeSchedule } from '../../store/rider-full-time-schedule';
import { RiderType } from 'src/app/store/rider-type.enum';
import { RiderPartTimeShift } from 'src/app/store/rider-part-time-shift';
import { PartTimeShiftValidator } from './partTimeShift.validator';

@Component({
  selector: 'app-rider-profile',
  templateUrl: './rider-profile.component.html',
  styleUrls: ['./rider-profile.component.css']
})
export class RiderProfileComponent implements OnInit {

  fullTimeForm: FormGroup;
  partTimeForm: FormGroup;
  rider: Rider;
  isFullTime: boolean;
  riderFullTimeSchedule: RiderFullTimeSchedule = {
    // set default values
    dayOption: [1,2,3,4,5],
    shiftOption: [1,1,1,1,1]
  };

  riderPartTimeShiftList: RiderPartTimeShift[];
  updateRiderPartTimeShiftList: RiderPartTimeShift[];

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

  dowChoices: any[] = [
    {value: 1, viewValue: 'Monday'},
    {value: 2, viewValue: 'Tuesday'},
    {value: 3, viewValue: 'Wednesday'},
    {value: 4, viewValue: 'Thursday'},
    {value: 5, viewValue: 'Friday'},
    {value: 6, viewValue: 'Saturday'},
    {value: 7, viewValue: 'Sunday'}
  ];

  startHourChoices: any[] = [
    {value: 10, viewValue: '1000'},
    {value: 11, viewValue: '1100'},
    {value: 12, viewValue: '1200'},
    {value: 13, viewValue: '1300'},
    {value: 14, viewValue: '1400'},
    {value: 15, viewValue: '1500'},
    {value: 16, viewValue: '1600'},
    {value: 17, viewValue: '1700'},
    {value: 18, viewValue: '1800'},
    {value: 19, viewValue: '1900'},
    {value: 20, viewValue: '2000'},
    {value: 21, viewValue: '2100'}
  ];

  endHourChoices: any[] = [
    {value: 11, viewValue: '1100'},
    {value: 12, viewValue: '1200'},
    {value: 13, viewValue: '1300'},
    {value: 14, viewValue: '1400'},
    {value: 15, viewValue: '1500'},
    {value: 16, viewValue: '1600'},
    {value: 17, viewValue: '1700'},
    {value: 18, viewValue: '1800'},
    {value: 19, viewValue: '1900'},
    {value: 20, viewValue: '2000'},
    {value: 21, viewValue: '2100'},
    {value: 22, viewValue: '2200'},
  ];
  
  constructor(private riderService: RiderService, private ftFb: FormBuilder, private ptFb: FormBuilder) { 
    this.fullTimeForm = ftFb.group({  
      'dayOption' : [null, Validators.required],  
      'shift1' : [null, Validators.required], 
      'shift2' : [null, Validators.required],  
      'shift3' : [null, Validators.required],  
      'shift4' : [null, Validators.required],  
      'shift5' : [null, Validators.required]
    });  

    this.partTimeForm = ptFb.group({   
      'dow' : [null, Validators.required], 
      'startHour' : [null, Validators.required],  
      'endHour' : [null, Validators.required]
    }, { validators: PartTimeShiftValidator });  
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
      this.riderService.fetchPartTimeShift(this.rider.id).subscribe((data: any[]) => {
        this.riderPartTimeShiftList = data;
      })
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

  addPartTime() {
    let partTimeShift: RiderPartTimeShift;
    partTimeShift = {
      ptsid: 0,
      drid: this.rider.id,
      dow: this.partTimeForm.controls.dow.value,
      startHour: this.partTimeForm.controls.startHour.value,
      endHour: this.partTimeForm.controls.endHour.value
    };
   this.updateRiderPartTimeShiftList.push(partTimeShift);
  }

  deletePartTimeShift(ptsid: number) {
    this.riderService.deletePartTimeShift(this.rider.id, ptsid).subscribe((data: any[]) => {
      this.riderPartTimeShiftList = data;
    });
  }

  deleteUpdatePartTimeShift(pts: RiderPartTimeShift) {
    const index = this.updateRiderPartTimeShiftList.indexOf(pts);
    if (index > -1) {
      this.updateRiderPartTimeShiftList.splice(index, 1);
    }
  }

  updatePartTimeShift() {
    this.riderService.addPartTimeShift(this.rider.id, this.updateRiderPartTimeShiftList).subscribe((data: any[]) => {
      this.riderPartTimeShiftList = data;
    });
    this.updateRiderPartTimeShiftList = [];
  }
}
