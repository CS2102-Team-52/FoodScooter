import { Component, OnInit } from '@angular/core';
import {FDSManagerService} from "../../services/users/fdsmanager/fdsmanager.service";
import {GeneralSummary} from "../../store/generalSummary";

@Component({
  selector: 'app-fdsmanager-generalsummary',
  templateUrl: './fdsmanager-generalsummary.component.html',
  styleUrls: ['./fdsmanager-generalsummary.component.css']
})
export class FDSManagerGeneralsummaryComponent implements OnInit {

  constructor(
    private fdsManagerService: FDSManagerService
  ) { }

  generalSummaryList: GeneralSummary[];

  ngOnInit(): void {
    this.getGeneralSummary();
  }

  getGeneralSummary(): void {
    this.fdsManagerService.fetchGeneralSummary().subscribe((data: any) => {
      console.log(data);
      this.generalSummaryList = data;
    })
  }
}
