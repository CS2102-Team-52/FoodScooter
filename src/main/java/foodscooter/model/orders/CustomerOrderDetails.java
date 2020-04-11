package foodscooter.model.orders;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class CustomerOrderDetails {
  private int customerId;
  private int restaurantId;
  private BigDecimal totalFoodCost;
  private int rewardPointsUsed;
  private PaymentType paymentType;
  private String deliveryLocation;
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

  public BigDecimal getTotalFoodCost() {
    return totalFoodCost;
  }

  public void setTotalFoodCost(BigDecimal totalFoodCost) {
    this.totalFoodCost = totalFoodCost;
  }

  public int getRewardPointsUsed() {
    return rewardPointsUsed;
  }

  public void setRewardPointsUsed(int rewardPointsUsed) {
    this.rewardPointsUsed = rewardPointsUsed;
  }

  public PaymentType getPaymentType() {
    return paymentType;
  }

  public void setPaymentType(PaymentType paymentType) {
    this.paymentType = paymentType;
  }

  public String getDeliveryLocation() {
    return deliveryLocation;
  }

  public void setDeliveryLocation(String deliveryLocation) {
    this.deliveryLocation = deliveryLocation;
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
