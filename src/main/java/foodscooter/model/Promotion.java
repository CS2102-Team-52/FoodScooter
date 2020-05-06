package foodscooter.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Promotion {
  private int id;
  private String name;
  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private PromotionType type;
  private BigDecimal discount;

  public Promotion(
    int id,
    String name,
    LocalDateTime startDate,
    LocalDateTime endDate,
    PromotionType type,
    BigDecimal discount) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.type = type;
    this.discount = discount;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public LocalDateTime getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDateTime startDate) {
    this.startDate = startDate;
  }

  public LocalDateTime getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDateTime endDate) {
    this.endDate = endDate;
  }

  public PromotionType getType() {
    return type;
  }

  public void setType(PromotionType type) {
    this.type = type;
  }

  public BigDecimal getDiscount() {
    return discount;
  }

  public void setDiscount(BigDecimal discount) {
    this.discount = discount;
  }
}
