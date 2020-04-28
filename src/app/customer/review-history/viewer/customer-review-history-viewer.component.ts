import { Component, OnInit } from '@angular/core';
import { CustomerReview } from '../customer-review';
import { CustomerReviewHistoryService } from '../services/customer-review-history.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews-viewer',
  templateUrl: './customer-review-history-viewer.component.html',
  styleUrls: ['./customer-review-history-viewer.component.css']
})
export class CustomerReviewHistoryViewerComponent implements OnInit {
  private customerId: number;

  customerReviews: CustomerReview[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewHistoryService: CustomerReviewHistoryService
  ) { }

  ngOnInit(): void {
    this.customerId = Number(this.activatedRoute.snapshot.paramMap.get('customerId'));
    this.getCustomerReviews();
  }

  public getCustomerReviews() {
    this.reviewHistoryService.fetchReviews(this.customerId).subscribe(
      (data: CustomerReview[]) => {
        console.log(data);
        this.customerReviews = data;
      }
    );
  }
}
