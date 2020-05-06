package foodscooter.model;

import foodscooter.model.users.UserType;

public enum PromotionType {
  RESTAURANT("Restaurant"),
  FOOD_SCOOTER("Food Scooter");

  private final String string;

  PromotionType(String string) {
    this.string = string;
  }

  public static PromotionType map(String value) {
    for (PromotionType type : PromotionType.values()) {
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
