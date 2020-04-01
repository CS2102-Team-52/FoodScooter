package foodscooter.model.users;

import java.util.List;

public class Customer {
  private int id;
  private String creditCardNumber;
  private int rewardPoints;
  private List<String> recentPlaces;

  public Customer(int id, String creditCardNumber, int rewardPoints, List<String> recentPlaces) {
    this.id = id;
    this.creditCardNumber = creditCardNumber;
    this.rewardPoints = rewardPoints;
    this.recentPlaces = recentPlaces;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
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

  public List<String> getRecentPlaces() {
    return recentPlaces;
  }

  public void setRecentPlaces(List<String> recentPlaces) {
    this.recentPlaces = recentPlaces;
  }
}
