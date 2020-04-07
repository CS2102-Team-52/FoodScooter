package foodscooter.model.summaries;

public class CustomerSummary {
  private int numOrders;
  private String totalCost;

  public CustomerSummary(int numOrders, String totalCost) {
    this.numOrders = numOrders;
    this.totalCost = totalCost;
  }

  public int getNumOrders() {
    return numOrders;
  }

  public String getTotalCost() {
    return totalCost;
  }
}
