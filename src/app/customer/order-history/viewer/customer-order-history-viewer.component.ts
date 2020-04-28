import { Component, OnInit } from '@angular/core';
import { Order } from '../../../store/order';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerOrderHistoryService } from '../services/customer-order-history.service';

@Component({
  selector: 'app-orders-viewer',
  templateUrl: './customer-order-history-viewer.component.html',
  styleUrls: ['./customer-order-history-viewer.component.css']
})
export class CustomerOrderHistoryViewer implements OnInit {
  orders: Order[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderHistoryService: CustomerOrderHistoryService
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  public fetchOrders() {
    const customerId = Number(this.activatedRoute.snapshot.paramMap.get('customerId'));
    this.orderHistoryService.fetchOrders(customerId).subscribe(
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
    this.orderHistoryService.deleteOrder(orderId).subscribe(
      _ => this.orders = this.orders.filter(order => order.id !== orderId)
    );
  }
}
