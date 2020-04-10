package foodscooter.model.orders;

public enum PaymentType {
  CASH("Cash"),
  CREDIT_CARD("Credit Card");

  private String string;

  PaymentType(String string) {
    this.string = string;
  }

  public static PaymentType map(String value) {
    for (PaymentType type : PaymentType.values()) {
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
