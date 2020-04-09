package foodscooter.model;

public class Feedback {
  private int id;
  private int restaurantId;
  private int orderId;
  private int rating;
  private String review;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getRestaurantId() {
    return restaurantId;
  }

  public void setRestaurantId(int restaurantId) {
    this.restaurantId = restaurantId;
  }

  public int getOrderId() {
    return orderId;
  }

  public void setOrderId(int orderId) {
    this.orderId = orderId;
  }

  public int getRating() {
    return rating;
  }

  public void setRating(int rating) {
    this.rating = rating;
  }

  public String getReview() {
    return review;
  }

  public void setReview(String review) {
    this.review = review;
  }
}
