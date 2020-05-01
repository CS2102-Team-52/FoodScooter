import { Component, Input, OnInit } from '@angular/core';
import { CustomerOrderHistoryService } from '../services/customer-order-history.service';
import { CustomerOrderFeedback } from '../services/dtos/customer-order-feedback';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-feedback',
  templateUrl: './customer-order-feedback.component.html',
  styleUrls: ['./customer-order-feedback.component.css']
})
export class CustomerOrderFeedbackComponent implements OnInit {
  @Input() restaurantId: number;
  @Input() orderId: number;

  customerFeedbackForm = this.formBuilder.group({
    rating: ['', Validators.required],
    review: ['', Validators.required]
  })

  ratingChoices: number[];

  constructor(
    private formBuilder: FormBuilder,
    private customerOrderHistoryService: CustomerOrderHistoryService
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
      rating: this.customerFeedbackForm.get('rating').value,
      review: this.customerFeedbackForm.get('review').value
    };
    this.customerOrderHistoryService.submitFeedback(feedback).subscribe(_ => {});
  }
}
