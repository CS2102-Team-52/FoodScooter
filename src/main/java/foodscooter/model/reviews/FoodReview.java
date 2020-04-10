package foodscooter.model.reviews;

public class FoodReview {
  private String customerName;
  private String content;

  public FoodReview(String customerName, String content) {
    this.customerName = customerName;
    this.content = content;
  }

  public String getCustomerName() {
    return customerName;
  }

  public void setCustomerName(String customerName) {
    this.customerName = customerName;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
