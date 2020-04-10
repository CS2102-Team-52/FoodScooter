import { Component, OnInit } from '@angular/core';
import { Order } from '../../store/order';
import { RiderOrderService } from '../../services/users/rider/order/rider-order.service';
import { RiderService } from 'src/app/services/users/rider/rider.service';
import { Rider } from './rider';
import { LoginService } from 'src/app/login/services/login.service';
import { RiderType } from "../../store/rider-type.enum";
import { LoginResponse } from 'src/app/login/services/dto/login-response';
import { SalaryInfo } from 'src/app/store/salary-info';

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
  acceptedOrderList: Order[];
  summaryList: Order[];
  orderList: Order[];
  rider: Rider;
  loginResponse: LoginResponse;
  salaryInfo: SalaryInfo;

  ngOnInit(): void {
    this.showOrder = false;
    this.showSummary = false;
    this.loginResponse = this.loginService.getLoginResponse();
    this.getRiderType();
    this.getAcceptedOrders();
  }

  getRiderType() {
    this.riderService.fetchRiderInfo(this.loginResponse.userId).subscribe((data: any) => {
      console.log(data);
      this.rider = data;
    })
  }

  getAcceptedOrders() {
    this.riderOrderService.fetchAcceptedOrders(this.loginResponse.userId).subscribe((data: any[]) => {
      console.log(data);
      this.acceptedOrderList = data;
    })
  }

  viewOrder(): void {
    this.showOrder = true;
    this.showSummary = false;
    this.getOrder();
  }

  viewSummary(): void {
    this.showSummary = true;
    this.showOrder = false;
    this.getSummary();
  }

  getOrder(): void {
    if (RiderType[this.rider.riderType] === RiderType.FULL_TIME) {
      /*  this.riderOrderService.fetchFullTimeOrders(this.rider.id).subscribe((data: any[])=>{
        console.log(data);
        this.orderList = data;
      }) */
      const order1: Order = {
        id: 1,
        restaurantId: -1, //added for compatibility
        foodCost: 1,
        deliveryFee: 1,
        paymentType: "test",
        location: "te",
        orderTime: null,
        deliveryTime: null
      };
      this.orderList = [order1];
    } else {
      /* this.riderOrderService.fetchPartTimeOrders(this.rider.id).subscribe((data: any[])=>{
      console.log(data);
      this.orderList = data;
    }) */
      const order2: Order = {
        id: 2,
        restaurantId: -1, //added for compatibility
        foodCost: 2,
        deliveryFee: 2,
        paymentType: "test",
        location: "te",
        orderTime: null,
        deliveryTime: null
      };
      this.orderList = [order2];
    }
  }

  getSummary(): void {
    this.riderOrderService.fetchRiderSummary(this.rider.id).subscribe((data: any[]) => {
      this.summaryList = data;
    })
    this.riderService.fetchSalaryInfo(this.rider.id).subscribe((data: any) => {
      console.log(data);
      this.salaryInfo = data;
    })

  }

  acceptOrder(orderId: number) {
    this.riderOrderService.acceptOrder(this.rider.id, orderId).subscribe((data: any[]) => {
      console.log(data);
      this.acceptedOrderList = data;
    })
  }

  doneOrder(orderId: number) {
    this.riderOrderService.doneOrder(this.rider.id, orderId).subscribe((data: any[]) => {
      console.log(data);
      this.summaryList = data;
    })
  }

  refreshAcceptOrders(orderId: number) {
    this.acceptOrder(orderId);
    this.getOrder();
  }

  refreshDoneOrders(orderId: number) {
    this.doneOrder(orderId);
    this.getAcceptedOrders();
  }
}
