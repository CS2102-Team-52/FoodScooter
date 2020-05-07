package foodscooter.model.orders;

public class OrderReviewStatus {
  private int orderId;
  private int reviewId;

  public OrderReviewStatus(int orderId, int reviewId) {
    this.orderId = orderId;
    this.reviewId = reviewId;
  }

  public int getOrderId() {
    return orderId;
  }

  public void setOrderId(int orderId) {
    this.orderId = orderId;
  }

  public int getReviewId() {
    return reviewId;
  }

  public void setReviewId(int reviewId) {
    this.reviewId = reviewId;
  }
}
