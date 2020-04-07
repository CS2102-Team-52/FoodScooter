package foodscooter.repositories;

import java.util.List;

import foodscooter.model.summaries.CustomerSummary;
import foodscooter.model.summaries.LocationSummary;
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
  public int getNewCustomers(int year, int month) {
    return 0;
  }

  @Override
  public int getTotalOrders(int year, int month) {
    return jdbcTemplate.queryForObject(
      "SELECT COUNT(oid) FROM Orders "
        + "WHERE EXTRACT(year FROM orderTime) = ? "
        + "AND EXTRACT(month FROM orderTime) = ?;",
      new Object[]{ year, month },
      Integer.class);
  }

  @Override
  public String getTotalCostAllOrders(int year, int month) {
    return jdbcTemplate.queryForObject(
      "SELECT COUNT(oid) FROM Orders "
        + "WHERE EXTRACT(year FROM orderTime) = ? "
        + "AND EXTRACT(month FROM orderTime) = ?;",
      new Object[]{ year, month },
      String.class);
  }

  @Override
  public List<CustomerSummary> getCustomerSummary() {
    String sql = "SELECT date_trunc('month', orderTime) as month, cid, COUNT(oid), SUM(totalCost) "
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
    String sql = "SELECT date_trunc('hour', orderTime) as hours, location, COUNT(oid) "
      + "FROM Orders "
      + "GROUP BY hours, location;";
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
    String sql = "SELECT date_trunc('month', orderTime) as month, Orders.drid, COUNT(Orders.oid) as numOrders, "
      + "0 as hours, salary, AVG(DATE_PART('minute', departureTime - deliveryTime)) as avgDeliveryTime, "
      + "COUNT(rating) as numRatings, AVG(rating) as avgRatings "
      + "FROM Orders "
      + "LEFT JOIN DeliveryRiders "
      + "ON Orders.drid = DeliveryRiders.drid "
      + "LEFT JOIN Reviews "
      + "ON Orders.oid = Reviews.oid "
      + "GROUP BY month, Orders.drid, salary;";
    return jdbcTemplate.query(
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
  }
}
