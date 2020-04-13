package foodscooter.model.summaries;

import java.time.LocalDateTime;

public class LocationSummary {

  private LocalDateTime hour;
  private String location;
  private int numOrders;

  public LocationSummary(LocalDateTime hour, String location, int numOrders) {
    this.hour = hour;
    this.location = location;
    this.numOrders = numOrders;
  }

  public LocalDateTime getHour() {
    return hour;
  }

  public String getLocation() {
    return location;
  }

  public int getNumOrders() {
    return numOrders;
  }
}
