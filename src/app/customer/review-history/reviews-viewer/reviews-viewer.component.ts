import { Component, OnInit } from '@angular/core';
import { CustomerReview } from '../customer-review';
import { ReviewHistoryService } from '../services/review-history.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews-viewer',
  templateUrl: './reviews-viewer.component.html',
  styleUrls: ['./reviews-viewer.component.css']
})
export class ReviewsViewerComponent implements OnInit {
  customerReviews: CustomerReview[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewHistoryService: ReviewHistoryService
  ) { }

  ngOnInit(): void {
    this.getCustomerReviews();
  }

  public getCustomerReviews() {
    console.log("before sending");
    const customerId = Number(this.activatedRoute.snapshot.paramMap.get('customerId'));
    console.log(customerId);
    this.reviewHistoryService.fetchReviews(customerId).subscribe(
      (data: CustomerReview[]) => {
        console.log(data);
        this.customerReviews = data;
      }
    );
  }
}
