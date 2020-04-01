package foodscooter.model.users;

public class Rider extends User {
  private boolean isFullTime;

  public Rider(int id, String username, String password, boolean isFullTime) {
    super(id, username, password);
    this.isFullTime = isFullTime;
  }

  public boolean isFullTime() {
    return isFullTime;
  }

  public void setFullTime(boolean fullTime) {
    isFullTime = fullTime;
  }
}
