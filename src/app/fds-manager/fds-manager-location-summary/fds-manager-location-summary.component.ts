import { Component, OnInit } from '@angular/core';
import {LocationSummary} from "../../store/summaries/locationSummary";
import {FDSManagerService} from "../../services/users/fdsmanager/fdsmanager.service";

@Component({
  selector: 'app-fds-manager-location-summary',
  templateUrl: './fds-manager-location-summary.component.html',
  styleUrls: ['./fds-manager-location-summary.component.css']
})
export class FdsManagerLocationSummaryComponent implements OnInit {
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
