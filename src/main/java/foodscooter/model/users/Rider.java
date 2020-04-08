package foodscooter.model.users;

import foodscooter.model.UserType;
import foodscooter.model.rider.RiderType;

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
