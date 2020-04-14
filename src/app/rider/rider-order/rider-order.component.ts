import { Component, OnInit } from '@angular/core';
import { RiderOrderService } from 'src/app/services/users/rider/order/rider-order.service';
import { Order } from 'src/app/store/order';
import { Rider } from '../rider';
import { RiderService } from 'src/app/services/users/rider/rider.service';
import { RiderType } from 'src/app/store/rider-type.enum';

@Component({
  selector: 'app-rider-order',
  templateUrl: './rider-order.component.html',
  styleUrls: ['./rider-order.component.css']
})
export class RiderOrderComponent implements OnInit {

  acceptedOrderList: Order[];
  orderList: Order[];
  rider: Rider;

  constructor(
    private riderService: RiderService,
    private riderOrderService: RiderOrderService
  ) { }

  ngOnInit(): void {
    this.rider = this.riderService.getRider();
    this.getAcceptedOrders();
    this.getOrder();
  }

  getAcceptedOrders() {
    this.riderOrderService.fetchAcceptedOrders(this.rider.id).subscribe((data: any[]) => {
      console.log(data);
      this.acceptedOrderList = data;
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
    })
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

  refreshOrders(orderId: number) {
    this.acceptOrder(orderId);
    this.getOrder();
  }

    refreshAcceptedOrders(orderId: number) {
    this.doneOrder(orderId);
    this.getAcceptedOrders();
  }
}
