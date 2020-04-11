package foodscooter.model.users;

public class User {
  private int id;
  private String username;
  private String password;
  private UserType userType;

  public User(int id, UserType userType) {
    this.id = id;
    this.userType = userType;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public UserType getUserType() {
    return userType;
  }

  public void setUserType(UserType userType) {
    this.userType = userType;
  }
}
