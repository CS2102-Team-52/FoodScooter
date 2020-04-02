package foodscooter.model.users;

import foodscooter.model.UserType;
import foodscooter.model.rider.RiderType;

public class Rider extends User {
  private RiderType rider;

  public Rider(int id, String username, String password, RiderType rider) {
    super(id, username, password, UserType.DELIVERY_RIDER);
    this.rider = rider;
  }

  public RiderType getRider() {
    return rider;
  }

  public void setRider(RiderType rider) {
    this.rider = rider;
  }
}
