import { Component, OnInit } from '@angular/core';
import {RiderSummary} from "../../store/summaries/riderSummary";
import {FDSManagerService} from "../../services/users/fdsmanager/fdsmanager.service";

@Component({
  selector: 'app-fds-manager-rider-summary',
  templateUrl: './fds-manager-rider-summary.component.html',
  styleUrls: ['./fds-manager-rider-summary.component.css']
})
export class FdsManagerRiderSummaryComponent implements OnInit {
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
