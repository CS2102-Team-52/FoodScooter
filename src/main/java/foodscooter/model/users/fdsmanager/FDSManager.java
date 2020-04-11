package foodscooter.model.users.fdsmanager;

import foodscooter.model.users.User;
import foodscooter.model.users.UserType;

public class FDSManager extends User {

  public FDSManager(int id, UserType userType) {
    super(id, UserType.FOOD_SCOOTER_MANAGER);
  }
}
