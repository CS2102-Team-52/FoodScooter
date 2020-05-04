import { Component, OnInit } from '@angular/core';
import {RiderSummary} from "../../store/summaries/riderSummary";
import {FDSManagerService} from "../../services/users/fdsmanager/fdsmanager.service";

@Component({
  selector: 'app-fdsmanager-ridersummary',
  templateUrl: './fdsmanager-ridersummary.component.html',
  styleUrls: ['./fdsmanager-ridersummary.component.css']
})
export class FDSManagerRidersummaryComponent implements OnInit {
  riderSummaryList: RiderSummary[];

  constructor(
    private fdsManagerService: FDSManagerService
  ) { }

  ngOnInit(): void {
    this.getRiderSummary();
  }

  getRiderSummary(): void {
    this.fdsManagerService.fetchRiderSummary().subscribe((data: any[]) => {
      console.log(data);
      this.riderSummaryList = data;
    })
  }
}
