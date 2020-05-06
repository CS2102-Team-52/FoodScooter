import { Component, OnInit } from '@angular/core';
import {CustomerSummary} from "../../store/summaries/customerSummary";
import {FDSManagerService} from "../../services/users/fdsmanager/fdsmanager.service";

@Component({
  selector: 'app-fds-manager-customer-summary',
  templateUrl: './fds-manager-customer-summary.component.html',
  styleUrls: ['./fds-manager-customer-summary.component.css']
})
export class FdsManagerCustomerSummaryComponent implements OnInit {
  customerSummaryList: CustomerSummary[];

  constructor(
    private fdsManagerService: FDSManagerService
  ) { }

  ngOnInit(): void {
    this.getCustomerSummary();
  }

  getCustomerSummary(): void {
    this.fdsManagerService.fetchCustomerSummary().subscribe((data: any[]) => {
      console.log(data);
      this.customerSummaryList = data;
    })
  }
}
