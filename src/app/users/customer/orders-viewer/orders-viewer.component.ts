import { Component, OnInit } from '@angular/core';
import { Order } from "../../../store/order";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerOrderService } from "../../../services/users/customer/order/customer-order.service";

@Component({
  selector: 'app-orders-viewer',
  templateUrl: './orders-viewer.component.html',
  styleUrls: ['./orders-viewer.component.css']
})
export class OrdersViewerComponent implements OnInit {
  orders: Order[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: CustomerOrderService
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  public fetchOrders() {
    const customerId = Number(this.activatedRoute.snapshot.paramMap.get('customerId'));
    this.orderService.fetchOrders(customerId).subscribe(
      (data: Order[]) => {
        this.orders = data;
      }
    );
  }

  public deleteOrder(orderId: number) {
    const customerId = Number(this.activatedRoute.snapshot.paramMap.get('customerId'));
    this.orderService.deleteOrder(customerId, orderId).subscribe(
      _ => this.orders.filter(order => order.oid != orderId)
    );
  }
}
