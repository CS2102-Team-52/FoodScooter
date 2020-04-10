package foodscooter.model.users.rider;

import foodscooter.model.users.UserType;
import foodscooter.model.users.User;

public class Rider extends User {
  private RiderType riderType;

  public Rider(int id, RiderType riderType) {
    super(id, UserType.DELIVERY_RIDER);
    this.riderType = riderType;
  }

  public RiderType getRiderType() {
    return this.riderType;
  }

  public void setRiderType(RiderType riderType) {
    this.riderType= riderType;
  }
}
