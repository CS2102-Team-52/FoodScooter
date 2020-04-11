package foodscooter.model.users;

public enum UserType {
  DELIVERY_RIDER("Delivery Rider"),
  CUSTOMER("Customer"),
  RESTAURANT_STAFF("Restaurant Staff"),
  FOOD_SCOOTER_MANAGER("Food Scooter Manager");

  private String string;

  UserType(String string) {
    this.string = string;
  }

  public static UserType map(String value) {
    for (UserType type : UserType.values()) {
      if (type.toString().equals(value)) {
        return type;
      }
    }
    throw new RuntimeException();
  }

  @Override
  public String toString() {
    return string;
  }
}
