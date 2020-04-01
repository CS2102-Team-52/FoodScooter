import { Component, OnInit } from '@angular/core';
import { Order } from '../../store/order';
import { RiderOrderService } from '../../services/rider/order/rider-order.service';
import { RiderService } from 'src/app/services/rider/rider.service';
import { Rider } from './rider';
import { User } from '../user';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.css']
})
export class RiderComponent implements OnInit {

  constructor(
    private riderService: RiderService,
    private riderOrderService: RiderOrderService,
    private loginService: LoginService) { 
  }

  showSummary: boolean;
  showOrder: boolean;
  summaryList: Order[];
  orderList: Order[];
  rider: Rider;
  user: User;

  ngOnInit(): void {
    this.showOrder = false;
    this.showSummary = false;
    this.user = this.loginService.getUser();
    this.getRiderType();
  }

  getRiderType() {
    this.riderService.fetchRiderInfo(this.user).subscribe((data: any)=>{
      console.log(data);
      this.rider = data;
    })
  }

  viewOrder() : void {
    this.showOrder = true;
    this.showSummary = false;
    this.getOrder();
  }

  viewSummary() : void {
    this.showSummary = true;
    this.showOrder = false;
    this.getSummary();
  }

   getOrder(): void {
    if (this.rider.isFullTime) {
     /*  this.riderOrderService.fetchFullTimeOrders().subscribe((data: any[])=>{
        console.log(data);
        this.orderList = data;
      }) */
      const order1: Order = {
        oid: 1,
        totalCost: 1,
        deliveryFee: 1,
        paymentType: "test",
        location: "te",
        orderTime: null,
        deliveryTime: null
      }
      this.orderList = [order1];
    } else {
      /* this.riderOrderService.fetchPartTimeOrders().subscribe((data: any[])=>{
        console.log(data);
        this.orderList = data;
      }) */
      const order2: Order = {
        oid: 2,
        totalCost: 2,
        deliveryFee: 2,
        paymentType: "test",
        location: "te",
        orderTime: null,
        deliveryTime: null
      }
      this.orderList = [order2];
    }
  }

  getSummary(): void {
    this.riderOrderService.fetchRiderSummary().subscribe((data: any[])=>{
      console.log(data);
      this.summaryList = data;
    })  
  } 

}
