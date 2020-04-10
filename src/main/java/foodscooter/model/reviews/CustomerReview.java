package foodscooter.model.reviews;

public class CustomerReview {
  private String restaurantName;
  private String content;

  public CustomerReview(String restaurantName, String content) {
    this.restaurantName = restaurantName;
    this.content = content;
  }

  public String getRestaurantName() {
    return restaurantName;
  }

  public void setRestaurantName(String restaurantName) {
    this.restaurantName = restaurantName;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
