package foodscooter.model.summaries;

import java.time.LocalDateTime;

public class RiderSummary {
  private LocalDateTime month;
  private int drid;
  private int numOrders;
  private int hoursWorked;
  private String totalSalary;
  private int avgDeliveryTime; //in minutes
  private int numRatings;
  private int avgRatings;

  public RiderSummary(LocalDateTime month, int drid, int numOrders, int hoursWorked, String totalSalary,
    int avgDeliveryTime, int numRatings, int avgRatings) {
    this.month = month;
    this.drid = drid;
    this.numOrders = numOrders;
    this.hoursWorked = hoursWorked;
    this.totalSalary = totalSalary;
    this.avgDeliveryTime = avgDeliveryTime;
    this.numRatings = numRatings;
    this.avgRatings = avgRatings;
  }

  public LocalDateTime getMonth() {
    return month;
  }

  public int getDrid() {
    return drid;
  }

  public int getNumOrders() {
    return numOrders;
  }

  public int getHoursWorked() {
    return hoursWorked;
  }

  public String getTotalSalary() {
    return totalSalary;
  }

  public int getAvgDeliveryTime() {
    return avgDeliveryTime;
  }

  public int getNumRatings() {
    return numRatings;
  }

  public int getAvgRatings() {
    return avgRatings;
  }
}
