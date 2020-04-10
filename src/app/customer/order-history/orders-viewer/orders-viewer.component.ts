import { Component, OnInit } from '@angular/core';
import { Order } from '../../../store/order';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerOrderService } from '../../restaurants/restaurant-order-placer/services/customer-order.service';

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
        console.log(data);
        this.orders = data;
      }
    );
  }

  public giveFeedback(orderId: number) {
    this.router.navigate([orderId, 'review'], {relativeTo: this.activatedRoute}).then(_ => {});
  }

  public deleteOrder(orderId: number) {
    this.orderService.deleteOrder(orderId).subscribe(
      _ => this.orders = this.orders.filter(order => order.id !== orderId)
    );
  }
}
