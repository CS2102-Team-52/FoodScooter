import { Component, OnInit } from '@angular/core';
import { Order } from '../../store/order';
import { RiderOrderService } from './order/rider-order.service';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.css']
})
export class RiderComponent implements OnInit {

  constructor(private riderOrderService: RiderOrderService) { 
  }

  showSummary: boolean;
  showOrder: boolean;
  summaryList: Order[];
  orderList: Order[];
  isFullTime: boolean; 

  ngOnInit(): void {
    this.showOrder = false;
    this.showSummary = false;
    //this.getRiderType();
  }

  getRiderType() {
    //TO-DO 
  }

  viewOrder() : void {
    this.showOrder = true;
    this.showSummary = false;
    //this.getOrder();
  }

  viewSummary() : void {
    this.showSummary = true;
    this.showOrder = false;
    //this.getSummary();
  }

/*   getOrder(): void {
    if (this.isFullTime) {
      this.riderOrderService.fetchFullTimeOrders().subscribe((data: any[])=>{
        console.log(data);
        this.summaryList = data;
      })
    } else {
      this.riderOrderService.fetchPartTimeOrders().subscribe((data: any[])=>{
        console.log(data);
        this.summaryList = data;
      })
    }
  }

  getSummary(): void {
    this.riderOrderService.fetchRiderSummary().subscribe((data: any[])=>{
      console.log(data);
      this.summaryList = data;
    })  
  } */

}
