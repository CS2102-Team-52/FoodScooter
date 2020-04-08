package foodscooter.api.dtos.login;

import com.fasterxml.jackson.annotation.JsonProperty;
import foodscooter.model.UserType;

public class LoginResponse {
  @JsonProperty("isAuthenticated")
  private boolean isAuthenticated;
  private UserType userType;
  private int userId;

  public LoginResponse() {

  }

  public LoginResponse(boolean isAuthenticated, UserType userType, int userId) {
    this.isAuthenticated = isAuthenticated;
    this.userType = userType;
    this.userId = userId;
  }

  public boolean isAuthenticated() {
    return isAuthenticated;
  }

  public void setAuthenticated(boolean authenticated) {
    isAuthenticated = authenticated;
  }

  public UserType getUserType() {
    return userType;
  }

  public void setUserType(UserType userType) {
    this.userType = userType;
  }

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public static LoginResponse fail() {
    return new LoginResponse(false, null, -1);
  }
}
