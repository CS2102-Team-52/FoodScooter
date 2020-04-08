package foodscooter.api.dtos.orders;

import foodscooter.model.PaymentType;

import java.time.LocalDateTime;
import java.util.List;

public class CustomerOrderDetails {
  private int customerId;
  private int restaurantId;
  private int totalFoodCost;
  private PaymentType paymentType;
  private String location;
  private LocalDateTime orderTime;

  private List<Integer> foodItems;
  private List<Integer> quantity;

  public int getCustomerId() {
    return customerId;
  }

  public void setCustomerId(int customerId) {
    this.customerId = customerId;
  }

  public int getRestaurantId() {
    return restaurantId;
  }

  public void setRestaurantId(int restaurantId) {
    this.restaurantId = restaurantId;
  }

  public int getTotalFoodCost() {
    return totalFoodCost;
  }

  public void setTotalFoodCost(int totalFoodCost) {
    this.totalFoodCost = totalFoodCost;
  }

  public PaymentType getPaymentType() {
    return paymentType;
  }

  public void setPaymentType(PaymentType paymentType) {
    this.paymentType = paymentType;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public LocalDateTime getOrderTime() {
    return orderTime;
  }

  public void setOrderTime(LocalDateTime orderTime) {
    this.orderTime = orderTime;
  }

  public List<Integer> getFoodItems() {
    return foodItems;
  }

  public void setFoodItems(List<Integer> foodItems) {
    this.foodItems = foodItems;
  }

  public List<Integer> getQuantity() {
    return quantity;
  }

  public void setQuantity(List<Integer> quantity) {
    this.quantity = quantity;
  }
}
