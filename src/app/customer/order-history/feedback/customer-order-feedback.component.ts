import { Component, Input, OnInit } from '@angular/core';
import { CustomerOrderHistoryService } from '../services/customer-order-history.service';
import { CustomerOrderFeedback } from './customer-order-feedback';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-feedback',
  templateUrl: './customer-order-feedback.component.html',
  styleUrls: ['./customer-order-feedback.component.css']
})
export class CustomerOrderFeedbackComponent implements OnInit {
  ratingChoices: number[];

  rating: number;
  review: string;

  @Input() restaurantId: number;
  @Input() orderId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderHistoryService: CustomerOrderHistoryService
  ) {
    this.ratingChoices = [1, 2, 3, 4, 5];
  }

  ngOnInit(): void {
  }

  public submitFeedback() {
    const feedback: CustomerOrderFeedback = {
      id: -1,
      restaurantId: this.restaurantId,
      orderId: this.orderId,
      rating: this.rating,
      review: this.review
    };
    this.orderHistoryService.submitFeedback(feedback).subscribe(_ => {});
  }
}