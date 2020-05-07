package foodscooter.model.summaries;

import java.time.LocalDateTime;

public class PromotionSummary {
  private int pid;
  private String name;
  private String duration;
  private String promotionType;
  private float discount;
  private float avgOrders;

  public PromotionSummary(int pid, String name, String duration, String promotionType, float discount,
    float avgOrders) {
    this.pid = pid;
    this.name = name;
    this.duration = duration;
    this.promotionType = promotionType;
    this.discount = discount;
    this.avgOrders = avgOrders;
  }

  public int getPid() {
    return pid;
  }

  public String getDuration() {
    return duration;
  }

  public String getPromotionType() {
    return promotionType;
  }

  public float getDiscount() {
    return discount;
  }

  public float getAvgOrders() {
    return avgOrders;
  }

  public String getName() {
    return name;
  }
}
