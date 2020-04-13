package foodscooter.model.users.restaurantstaff;

import foodscooter.model.users.User;
import foodscooter.model.users.UserType;

public class RestaurantStaff extends User {

  public RestaurantStaff(int id, UserType userType) {
    super(id, UserType.RESTAURANT_STAFF);
  }
}
