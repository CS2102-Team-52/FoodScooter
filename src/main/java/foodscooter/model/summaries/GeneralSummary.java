package foodscooter.model.summaries;

import java.time.LocalDateTime;

public class GeneralSummary {

  private LocalDateTime month;
  private int numOrders;
  private String totalCost;

  public GeneralSummary(LocalDateTime month, int numOrders, String totalCost) {
    this.month = month;
    this.numOrders = numOrders;
    this.totalCost = totalCost;
  }
}
