import { Component, OnInit } from '@angular/core';
import {CustomerSummary} from "../../store/customerSummary";
import {FDSManagerService} from "../../services/users/fdsmanager/fdsmanager.service";

@Component({
  selector: 'app-fdsmanager-customersummary',
  templateUrl: './fdsmanager-customersummary.component.html',
  styleUrls: ['./fdsmanager-customersummary.component.css']
})
export class FDSManagerCustomersummaryComponent implements OnInit {
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
