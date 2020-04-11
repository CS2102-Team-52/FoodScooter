package foodscooter.model.orders;

import java.util.List;

public class CustomerOrderOptions {
  private int rewardPoints;
  private List<String> recentPlaces;

  public CustomerOrderOptions(int rewardPoints, List<String> recentPlaces) {
    this.rewardPoints = rewardPoints;
    this.recentPlaces = recentPlaces;
  }

  public int getRewardPoints() {
    return rewardPoints;
  }

  public void setRewardPoints(int rewardPoints) {
    this.rewardPoints = rewardPoints;
  }

  public List<String> getRecentPlaces() {
    return recentPlaces;
  }

  public void setRecentPlaces(List<String> recentPlaces) {
    this.recentPlaces = recentPlaces;
  }
}
