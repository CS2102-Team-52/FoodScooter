package foodscooter.model.orders;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Order {
  private int id;
  private int customerId;
  private int riderId;
  private int restaurantId;

  private BigDecimal foodCost;
  private BigDecimal deliveryFee;
  private int rewardPointsUsed;
  private PaymentType paymentType;

  private String deliveryLocation;

  private LocalDateTime orderTime;
  private LocalDateTime departureTime;
  private LocalDateTime restaurantArrivalTime;
  private LocalDateTime restaurantDepartureTime;
  private LocalDateTime deliveryTime;

  public Order() {

  }

  public Order(
    int id,
    int customerId,
    int riderId,
    int restaurantId,
    BigDecimal foodCost,
    BigDecimal deliveryFee,
    int rewardPointsUsed,
    PaymentType paymentType,
    String deliveryLocation,
    LocalDateTime orderTime,
    LocalDateTime departureTime,
    LocalDateTime restaurantArrivalTime,
    LocalDateTime restaurantDepartureTime,
    LocalDateTime deliveryTime) {
    this.id = id;
    this.customerId = customerId;
    this.riderId = riderId;
    this.restaurantId = restaurantId;
    this.foodCost = foodCost;
    this.deliveryFee = deliveryFee;
    this.rewardPointsUsed = rewardPointsUsed;
    this.paymentType = paymentType;
    this.deliveryLocation = deliveryLocation;
    this.orderTime = orderTime;
    this.departureTime = departureTime;
    this.restaurantArrivalTime = restaurantArrivalTime;
    this.restaurantDepartureTime = restaurantDepartureTime;
    this.deliveryTime = deliveryTime;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getCustomerId() {
    return customerId;
  }

  public void setCustomerId(int customerId) {
    this.customerId = customerId;
  }

  public int getRiderId() {
    return riderId;
  }

  public void setRiderId(int riderId) {
    this.riderId = riderId;
  }

  public int getRestaurantId() {
    return restaurantId;
  }

  public void setRestaurantId(int restaurantId) {
    this.restaurantId = restaurantId;
  }

  public BigDecimal getFoodCost() {
    return foodCost;
  }

  public void setFoodCost(BigDecimal foodCost) {
    this.foodCost = foodCost;
  }

  public BigDecimal getDeliveryFee() {
    return deliveryFee;
  }

  public void setDeliveryFee(BigDecimal deliveryFee) {
    this.deliveryFee = deliveryFee;
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

  public LocalDateTime getDepartureTime() {
    return departureTime;
  }

  public void setDepartureTime(LocalDateTime departureTime) {
    this.departureTime = departureTime;
  }

  public LocalDateTime getRestaurantArrivalTime() {
    return restaurantArrivalTime;
  }

  public void setRestaurantArrivalTime(LocalDateTime restaurantArrivalTime) {
    this.restaurantArrivalTime = restaurantArrivalTime;
  }

  public LocalDateTime getRestaurantDepartureTime() {
    return restaurantDepartureTime;
  }

  public void setRestaurantDepartureTime(LocalDateTime restaurantDepartureTime) {
    this.restaurantDepartureTime = restaurantDepartureTime;
  }

  public LocalDateTime getDeliveryTime() {
    return deliveryTime;
  }

  public void setDeliveryTime(LocalDateTime deliveryTime) {
    this.deliveryTime = deliveryTime;
  }
}
