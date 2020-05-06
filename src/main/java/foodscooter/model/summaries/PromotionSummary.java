package foodscooter.model.summaries;

import java.time.LocalDateTime;

public class PromotionSummary {
  private int pid;
  private LocalDateTime duration;
  private String promotionType;
  private float discount;
  private float avgOrders;

  public PromotionSummary(int pid, LocalDateTime duration, String promotionType, float discount, float avgOrders) {
    this.pid = pid;
    this.duration = duration;
    this.promotionType = promotionType;
    this.discount = discount;
    this.avgOrders = avgOrders;
  }
}
