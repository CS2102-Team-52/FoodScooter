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
    });
  }

  acceptOrder(orderId: number) {
    this.riderOrderService.acceptOrder(this.rider.id, orderId).subscribe((data: any[]) => {
      console.log(data);
      this.acceptedOrderList = data;
      this.getOrder();
    });
  }

  doneOrder(orderId: number) {
    this.riderOrderService.doneOrder(this.rider.id, orderId).subscribe((data: any[]) => {
      this.getAcceptedOrders();
    });
  }

  getOrder(): void {
    if (RiderType[this.rider.riderType] === RiderType.FULL_TIME) {
      this.riderOrderService.fetchFullTimeOrders(this.rider.id).subscribe((data: any[]) => {
        console.log(data);
        this.orderList = data;
      });
    } else {
      this.riderOrderService.fetchPartTimeOrders(this.rider.id).subscribe((data: any[]) => {
        console.log(data);
        this.orderList = data;
      });
    }
  }

  reachRestaurant(orderId: number) {
    this.riderOrderService.reachRestaurant(this.rider.id, orderId).subscribe((data: any[]) => {
      console.log(data);
      this.acceptedOrderList = data;
    });
  }

  leaveRestaurant(orderId: number) {
    this.riderOrderService.leaveRestaurant(this.rider.id, orderId).subscribe((data: any[]) => {
      console.log(data);
      this.acceptedOrderList = data;
    });
  }
}
