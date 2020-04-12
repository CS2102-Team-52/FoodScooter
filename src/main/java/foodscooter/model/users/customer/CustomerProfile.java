package foodscooter.model.users.customer;

import java.util.List;

public class CustomerProfile {
  private String username;
  private String password;
  private String creditCardNumber;
  private int rewardPoints;
  private List<String> recentDeliveryLocations;

  public CustomerProfile(
    String username,
    String password,
    String creditCardNumber,
    int rewardPoints,
    List<String> recentDeliveryLocations) {
    this.username = username;
    this.password = password;
    this.creditCardNumber = creditCardNumber;
    this.rewardPoints = rewardPoints;
    this.recentDeliveryLocations = recentDeliveryLocations;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getCreditCardNumber() {
    return creditCardNumber;
  }

  public void setCreditCardNumber(String creditCardNumber) {
    this.creditCardNumber = creditCardNumber;
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
