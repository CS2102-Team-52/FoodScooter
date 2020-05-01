import { Component, OnInit } from '@angular/core';
import {LocationSummary} from "../../store/locationSummary";
import {FDSManagerService} from "../../services/users/fdsmanager/fdsmanager.service";

@Component({
  selector: 'app-fdsmanager-locationsummary',
  templateUrl: './fdsmanager-locationsummary.component.html',
  styleUrls: ['./fdsmanager-locationsummary.component.css']
})
export class FDSManagerLocationsummaryComponent implements OnInit {
  locationSummaryList: LocationSummary[];

  constructor(
    private fdsManagerService: FDSManagerService
  ) { }

  ngOnInit(): void {
    this.getLocationSummary();
  }

  getLocationSummary(): void {
    this.fdsManagerService.fetchLocationSummary().subscribe((data: any[]) => {
      console.log(data);
      this.locationSummaryList = data;
    })
  }

}
