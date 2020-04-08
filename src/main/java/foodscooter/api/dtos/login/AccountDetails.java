package foodscooter.api.dtos.login;

import foodscooter.model.UserType;
import foodscooter.model.rider.RiderType;

public class AccountDetails {
  private String username;
  private String password;
  private UserType userType;
  private RiderType riderType;

  public AccountDetails() {

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

  public UserType getUserType() {
    return userType;
  }

  public void setUserType(UserType userType) {
    this.userType = userType;
  }

  public RiderType getRiderType() {
    return riderType;
  }

  public void setRiderType(RiderType riderType) {
    this.riderType = riderType;
  }
}
