package foodscooter.model.summaries;

import java.time.LocalDateTime;

public class CustomerSummary {
  private LocalDateTime month;
  private int cid;
  private int numOrders;
  private String totalCost;

  public CustomerSummary(LocalDateTime month, int cid, int numOrders, String totalCost) {
    this.month = month;
    this.cid = cid;
    this.numOrders = numOrders;
    this.totalCost = totalCost;
  }

  public LocalDateTime getMonth() {
    return month;
  }

  public int getCid() {
    return cid;
  }

  public int getNumOrders() {
    return numOrders;
  }

  public String getTotalCost() {
    return totalCost;
  }
}
