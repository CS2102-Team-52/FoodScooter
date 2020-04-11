import { Component, Input, OnInit } from '@angular/core';
import { OrderHistoryService } from '../services/order-history.service';
import { Feedback } from './feedback';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-feedback',
  templateUrl: './order-feedback.component.html',
  styleUrls: ['./order-feedback.component.css']
})
export class OrderFeedbackComponent implements OnInit {
  ratingChoices: number[];

  rating: number;
  review: string;

  @Input() restaurantId: number;
  @Input() orderId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderHistoryService: OrderHistoryService
  ) {
    this.ratingChoices = [1, 2, 3, 4, 5];
  }

  ngOnInit(): void {
  }

  public submitFeedback() {
    const feedback: Feedback = {
      id: -1,
      restaurantId: this.restaurantId,
      orderId: this.orderId,
      rating: this.rating,
      review: this.review
    };
    this.orderHistoryService.submitFeedback(feedback).subscribe(_ => {});
  }
}
