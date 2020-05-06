import { Component, OnInit } from '@angular/core';
import {FDSManagerService} from "../../services/users/fdsmanager/fdsmanager.service";
import {GeneralSummary} from "../../store/summaries/generalSummary";

@Component({
  selector: 'app-fds-manager-general-summary',
  templateUrl: './fds-manager-general-summary.component.html',
  styleUrls: ['./fds-manager-general-summary.component.css']
})
export class FdsManagerGeneralSummaryComponent implements OnInit {
  id: number;
  generalSummaryList: GeneralSummary[];

  constructor(
    private fdsManagerService: FDSManagerService
  ) { }

  ngOnInit(): void {
    this.getGeneralSummary();
  }

  getGeneralSummary(): void {
    this.fdsManagerService.fetchGeneralSummary().subscribe((data: any[]) => {
      console.log(data);
      this.generalSummaryList = data;
    })
  }
}
