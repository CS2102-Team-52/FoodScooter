package foodscooter.model.summaries;

import java.time.LocalDateTime;

public class RestaurantSummary {

  private LocalDateTime month;
  private int numOrders;
  private int totalCost;

  public RestaurantSummary(LocalDateTime month, int numOrders, int totalCost) {
    this.month = month;
    this.numOrders = numOrders;
    this.totalCost = totalCost;
  }

  public LocalDateTime getMonth() {
    return month;
  }

  public int getNumOrders() {
    return numOrders;
  }

  public int getTotalCost() {
    return totalCost;
  }
}
