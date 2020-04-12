package foodscooter.model.users.customer;

import foodscooter.model.users.UserType;
import foodscooter.model.users.User;

import java.util.List;

public class Customer extends User {
  private String creditCardNumber;
  private int rewardPoints;
  private List<String> recentDeliveryLocations;

  public Customer(int id, String creditCardNumber, int rewardPoints, List<String> recentDeliveryLocations) {
    super(id, UserType.CUSTOMER);
    this.creditCardNumber = creditCardNumber;
    this.rewardPoints = rewardPoints;
    this.recentDeliveryLocations = recentDeliveryLocations;
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
