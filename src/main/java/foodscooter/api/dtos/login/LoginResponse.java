package foodscooter.api.dtos.login;

import foodscooter.model.users.UserType;

public class LoginResponse {
  private UserType userType;
  private int userId;

  public LoginResponse(UserType userType, int userId) {
    this.userType = userType;
    this.userId = userId;
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
}
