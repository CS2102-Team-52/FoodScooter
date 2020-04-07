package foodscooter.repositories;

import java.util.List;

import foodscooter.model.summaries.CustomerSummary;
import foodscooter.model.summaries.LocationSummary;
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
        rs.getInt(1),
        rs.getString(2)
      ));
  }

  @Override
  public List<LocationSummary> getLocationSummary() {
    String sql = "SELECT date_trunc('hour', orderTime) as hour, location, COUNT(oid) "
      + "FROM Orders "
      + "GROUP BY location, hour;";
    return jdbcTemplate.query(
      sql,
      (rs, rowNum) -> new LocationSummary(
        rs.getTimestamp(1).toLocalDateTime(),
        rs.getString(2),
        rs.getInt(3)
      ));
  }
}
