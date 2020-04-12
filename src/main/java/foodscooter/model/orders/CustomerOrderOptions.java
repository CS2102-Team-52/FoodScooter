package foodscooter.model.orders;

import java.util.List;

public class CustomerOrderOptions {
  private int rewardPoints;
  private List<String> recentDeliveryLocations;

  public CustomerOrderOptions(int rewardPoints, List<String> recentDeliveryLocations) {
    this.rewardPoints = rewardPoints;
    this.recentDeliveryLocations = recentDeliveryLocations;
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
}
