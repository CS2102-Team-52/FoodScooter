import { Component, OnInit } from '@angular/core';
import { Order } from '../../../store/order';
import { ActivatedRoute } from '@angular/router';
import { CustomerOrderHistoryService } from '../services/customer-order-history.service';
import { OrderReviewStatus } from './order-review-status';
import has = Reflect.has;

@Component({
  selector: 'app-orders-viewer',
  templateUrl: './customer-order-history-viewer.component.html',
  styleUrls: ['./customer-order-history-viewer.component.css']
})
export class CustomerOrderHistoryViewer implements OnInit {
  private customerId: number;

  orders: Order[];
  orderReviewStatuses: OrderReviewStatus[];

  restaurantToFeedback: number;
  orderToFeedback: number;

  toShowFeedbackForm: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderHistoryService: CustomerOrderHistoryService
  ) {
    this.orderReviewStatuses = [];
    this.toShowFeedbackForm = false;
  }

  ngOnInit(): void {
    this.customerId = Number(this.activatedRoute.parent.snapshot.paramMap.get('customerId'));
    this.fetchOrders();
    this.fetchOrderStatuses();
  }

  public fetchOrders() {
    this.orderHistoryService.fetchOrders(this.customerId).subscribe(
      (data: Order[]) => {
        this.orders = data;
      }
    );
  }

  public fetchOrderStatuses() {
    this.orderHistoryService.fetchOrderStatuses(this.customerId).subscribe(
      (data: OrderReviewStatus[]) => {
        console.log(data);
        this.orderReviewStatuses = data;
      }
    )
  }

  public getOrderStatus(order: Order) {
    if (order.deliveryTime == null) {
      if (order.riderId == 0) {
        return 'Unassigned';
      } else {
        return 'On the way';
      }
    } else {
      return 'Delivered';
    }
  }

  public canFeedbackOrder(order: Order) {
    return this.getOrderStatus(order) == 'Delivered'
      && !this.hasFeedbackBefore(order.id);
  }

  private hasFeedbackBefore(orderId: number) {
    for (const r of this.orderReviewStatuses) {
      if (r.orderId == orderId) {
        return r.reviewId != 0;
      }
    }
    return false;
  }

  public feedbackOrder(order: Order) {
    console.log(order);
    this.orderToFeedback = order.id;
    this.restaurantToFeedback = order.restaurantId;
    this.toShowFeedbackForm = true;
  }

  public handleFeedbackCompletion() {
    this.toShowFeedbackForm = false;
    this.fetchOrderStatuses();
  }

  // public deleteOrder(orderId: number) {
  //   this.orderHistoryService.deleteOrder(orderId).subscribe(
  //     _ => this.orders = this.orders.filter(order => order.id !== orderId)
  //   );
  // }
}
