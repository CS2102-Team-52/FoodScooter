package foodscooter.model;

import java.time.LocalDateTime;

public class Promotion {
  private int id;
  private LocalDateTime startDay;
  private LocalDateTime endDay;
  private PromotionType type;
  private int discount;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public LocalDateTime getStartDay() {
    return startDay;
  }

  public void setStartDay(LocalDateTime startDay) {
    this.startDay = startDay;
  }

  public LocalDateTime getEndDay() {
    return endDay;
  }

  public void setEndDay(LocalDateTime endDay) {
    this.endDay = endDay;
  }

  public PromotionType getType() {
    return type;
  }

  public void setType(PromotionType type) {
    this.type = type;
  }

  public int getDiscount() {
    return discount;
  }

  public void setDiscount(int discount) {
    this.discount = discount;
  }
}
