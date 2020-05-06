package foodscooter.model.orders;

import foodscooter.model.Promotion;

import java.util.List;

public class CustomerOrderOptions {
  private int rewardPoints;
  private List<String> recentDeliveryLocations;
  private List<Promotion> availablePromotions;

  public CustomerOrderOptions(
    int rewardPoints,
    List<String> recentDeliveryLocations,
    List<Promotion> availablePromotions) {
    this.rewardPoints = rewardPoints;
    this.recentDeliveryLocations = recentDeliveryLocations;
    this.availablePromotions = availablePromotions;
  }

  public int getRewardPoints() {
    return rewardPoints;
  }

  public void setRewardPoints(int rewardPoints) {
    this.rewardPoints = rewardPoints;
  }

  public List<String> getRecentDeliveryLocations() {
    return recentDeliveryLocations;
  }

  public void setRecentDeliveryLocations(List<String> recentDeliveryLocations) {
    this.recentDeliveryLocations = recentDeliveryLocations;
  }

  public List<Promotion> getAvailablePromotions() {
    return availablePromotions;
  }

  public void setAvailablePromotions(List<Promotion> availablePromotions) {
    this.availablePromotions = availablePromotions;
  }
}
