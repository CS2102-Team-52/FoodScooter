package foodscooter.model.orders;

import foodscooter.model.Promotion;

import java.util.List;
import java.util.Set;

public class CustomerOrderOptions {
  private int rewardPoints;
  private Set<PaymentType> paymentTypes;
  private List<Promotion> availablePromotions;
  private List<String> recentDeliveryLocations;

  public CustomerOrderOptions(
    int rewardPoints,
    List<Promotion> availablePromotions,
    Set<PaymentType> paymentTypes,
    List<String> recentDeliveryLocations
  ) {
    this.rewardPoints = rewardPoints;
    this.availablePromotions = availablePromotions;
    this.paymentTypes = paymentTypes;
    this.recentDeliveryLocations = recentDeliveryLocations;
  }

  public int getRewardPoints() {
    return rewardPoints;
  }

  public void setRewardPoints(int rewardPoints) {
    this.rewardPoints = rewardPoints;
  }

  public Set<PaymentType> getPaymentTypes() {
    return paymentTypes;
  }

  public void setPaymentTypes(Set<PaymentType> paymentTypes) {
    this.paymentTypes = paymentTypes;
  }

  public List<Promotion> getAvailablePromotions() {
    return availablePromotions;
  }

  public void setAvailablePromotions(List<Promotion> availablePromotions) {
    this.availablePromotions = availablePromotions;
  }

  public List<String> getRecentDeliveryLocations() {
    return recentDeliveryLocations;
  }

  public void setRecentDeliveryLocations(List<String> recentDeliveryLocations) {
    this.recentDeliveryLocations = recentDeliveryLocations;
  }
}
