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
  private customerId: number;

  orders: Order[];

  toShowFeedbackForm: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderHistoryService: CustomerOrderHistoryService
  ) {
    this.toShowFeedbackForm = false;
  }

  ngOnInit(): void {
    this.customerId = Number(this.activatedRoute.parent.snapshot.paramMap.get('customerId'));
    this.fetchOrders();
  }

  public fetchOrders() {
    this.orderHistoryService.fetchOrders(this.customerId).subscribe(
      (data: Order[]) => {
        console.log(data);
        this.orders = data;
      }
    );
  }

  public feedbackOrder(orderId: number) {
    this.toShowFeedbackForm = true;
  }

  public deleteOrder(orderId: number) {
    this.orderHistoryService.deleteOrder(orderId).subscribe(
      _ => this.orders = this.orders.filter(order => order.id !== orderId)
    );
  }
}
