import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/store/order';
import { SalaryInfo } from 'src/app/store/salary-info';
import { Rider } from '../rider';
import { RiderService } from 'src/app/services/users/rider/rider.service';
import { RiderOrderService } from 'src/app/services/users/rider/order/rider-order.service';

@Component({
  selector: 'app-rider-summary',
  templateUrl: './rider-summary.component.html',
  styleUrls: ['./rider-summary.component.css']
})
export class RiderSummaryComponent implements OnInit {

  summaryList: Order[];
  salaryInfo: SalaryInfo = {
    numOfOrder: 0,
    riderSalary: 0
  };
  rider: Rider;

  constructor(
    private riderService: RiderService,
    private riderOrderService: RiderOrderService
  ) { }

  ngOnInit(): void {
    this.rider = this.riderService.getRider();
    this.getSummary();
  }

  getSummary(): void {
    this.riderOrderService.fetchRiderSummary(this.rider.id).subscribe((data: any[]) => {
      this.summaryList = data;
    });
    this.riderService.fetchSalaryInfo(this.rider.id).subscribe((data: any) => {
      console.log(data);
      this.salaryInfo = data;
    });
  }
}
