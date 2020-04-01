package foodscooter.model;

import java.util.List;

public class Restaurant {
  private int id;
  private String name;
  private int minimumPurchase;
  private List<Promotion> promotions;

  public Restaurant(int id, String name, int minimumPurchase, List<Promotion> promotions) {
    this.id = id;
    this.name = name;
    this.minimumPurchase = minimumPurchase;
    this.promotions = promotions;
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

  public int getMinimumPurchase() {
    return minimumPurchase;
  }

  public void setMinimumPurchase(int minimumPurchase) {
    this.minimumPurchase = minimumPurchase;
  }

  public List<Promotion> getPromotions() {
    return promotions;
  }

  public void setPromotions(List<Promotion> promotions) {
    this.promotions = promotions;
  }
}
