package foodscooter.model.users;

import foodscooter.model.UserType;

public class FDSManager extends User {

  public FDSManager(int id, String username, String password, UserType userType) {
    super(id, username, password, UserType.FOOD_SCOOTER_MANAGER);
  }
}
