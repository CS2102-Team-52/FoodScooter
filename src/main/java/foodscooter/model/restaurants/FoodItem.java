package foodscooter.model.restaurants;

public class FoodItem {
  private int id;
  private String name;
  private String category;
  private float price;
  private int dailyLimit;

  public FoodItem(int id, String name, String category, float price, int dailyLimit) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.dailyLimit = dailyLimit;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public float getPrice() {
    return price;
  }

  public void setPrice(float price) {
    this.price = price;
  }

  public int getDailyLimit() {
    return dailyLimit;
  }

  public void setDailyLimit(int dailyLimit) {
    this.dailyLimit = dailyLimit;
  }
}
