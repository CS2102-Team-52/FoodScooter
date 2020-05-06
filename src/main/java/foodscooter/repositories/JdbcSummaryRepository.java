package foodscooter.repositories;

import java.util.List;

import foodscooter.model.summaries.CustomerSummary;
import foodscooter.model.summaries.GeneralSummary;
import foodscooter.model.summaries.LocationSummary;
import foodscooter.model.summaries.PromotionSummary;
import foodscooter.model.summaries.RestaurantSummary;
import foodscooter.model.summaries.RiderSummary;
import foodscooter.repositories.specifications.SummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcSummaryRepository implements SummaryRepository {
  private JdbcTemplate jdbcTemplate;

  @Autowired
  public JdbcSummaryRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  //TODO: add account creation date column to Users table
  @Override
  public List<GeneralSummary> getGeneralSummary() {
    String sql = "SELECT date_trunc('month', orderTime) as month, COUNT(oid), SUM(foodCost + deliveryFee) as totalCost "
      + "FROM Orders "
      + "GROUP BY month;";
    return jdbcTemplate.query(
      sql,
      (rs, rowNum) -> new GeneralSummary(
        rs.getTimestamp(1).toLocalDateTime(),
        rs.getInt(2),
        rs.getString(3)
      ));
  }

  @Override
  public List<CustomerSummary> getCustomerSummary() {
    String sql = "SELECT date_trunc('month', orderTime) as month, cid, COUNT(oid), SUM(foodCost + deliveryFee) as totalCost "
      + "FROM Orders "
      + "GROUP BY month, cid;";
    return jdbcTemplate.query(
      sql,
      (rs, rowNum) -> new CustomerSummary(
        rs.getTimestamp(1).toLocalDateTime(),
        rs.getInt(2),
        rs.getInt(3),
        rs.getString(4)
      ));
  }

  @Override
  public List<LocationSummary> getLocationSummary() {
    String sql = "SELECT date_trunc('hour', orderTime) as hours, deliveryLocation, COUNT(oid) "
      + "FROM Orders "
      + "GROUP BY hours, deliveryLocation;";
    return jdbcTemplate.query(
      sql,
      (rs, rowNum) -> new LocationSummary(
        rs.getTimestamp(1).toLocalDateTime(),
        rs.getString(2),
        rs.getInt(3)
      ));
  }

  @Override
  public List<RiderSummary> getRiderSummary() {
    List<RiderSummary> result;

    String sql = "SELECT date_trunc('month', orderTime) as month, Orders.drid, COUNT(Orders.oid) as numOrders, "
      + "40 as hours, salary, AVG(DATE_PART('minute', departureTime - deliveryTime)) as avgDeliveryTime, "
      + "COUNT(rating) as numRatings, AVG(rating) as avgRatings "
      + "FROM Orders "
      + "LEFT JOIN DeliveryRiders "
      + "ON Orders.drid = DeliveryRiders.drid "
      + "LEFT JOIN Reviews "
      + "ON Orders.oid = Reviews.oid "
      + "GROUP BY month, Orders.drid, salary;";
    result = jdbcTemplate.query(
      sql,
      (rs, rowNum) -> new RiderSummary(
        rs.getTimestamp(1).toLocalDateTime(),
        rs.getInt(2),
        rs.getInt(3),
        rs.getInt(4),
        rs.getString(5),
        rs.getInt(6),
        rs.getInt(7),
        rs.getInt(8)
      ));

    // Update the total hours worked for part time riders
    for (RiderSummary riderSummary : result) {
      int drid = riderSummary.getDrid();
      int hoursWorked;
      String sql1 = "SELECT SUM(endHour - startHour)\n"
        + "FROM PTShifts\n"
        + "WHERE drid = ?;\n";
      hoursWorked = jdbcTemplate.queryForObject(sql1, new Object[]{drid}, Integer.class);
      if (hoursWorked != 0) {
        riderSummary.setHoursWorked(hoursWorked);
      }
    }

    return result;
  }

  @Override
  public List<RestaurantSummary> getRestaurantSummary(int rid) {
    String sql = "SELECT date_trunc('month', orderTime) as month, COUNT(oid) as numOrders, SUM(foodCost) as totalCost "
      + "FROM Orders "
      + "WHERE rid = ? "
      + "GROUP BY month;";
    return jdbcTemplate.query(
      sql,
      new Object[]{ rid },
      (rs, rowNum) -> new RestaurantSummary(
        rs.getTimestamp(1).toLocalDateTime(),
        rs.getInt(2),
        rs.getInt(3)
      ));
  }

  @Override
  public List<PromotionSummary> getPromotionSummary(int rid) {
    String sql = "SELECT Promotions.pid, age(endDate, startDate) as duration, type, discount, \n"
      + "(SELECT COUNT(oid) as avgOrdersPerDay \n"
      + "FROM Orders\n"
      + "WHERE orderTime BETWEEN startDate AND endDate)\n"
      + "FROM RestaurantPromotions\n"
      + "LEFT JOIN Promotions\n"
      + "ON RestaurantPromotions.pid = Promotions.pid\n"
      + "WHERE rid = ?;";
    return jdbcTemplate.query(
      sql,
      new Object[]{ rid },
      (rs, rowNum) -> new PromotionSummary(
        rs.getInt(1),
        rs.getTimestamp(2).toLocalDateTime(),
        rs.getString(3),
        rs.getFloat(4),
        rs.getFloat(5)
      ));
  }
}
