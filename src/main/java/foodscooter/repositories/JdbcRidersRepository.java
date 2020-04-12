package foodscooter.repositories;

import foodscooter.model.orders.Order;
import foodscooter.model.users.rider.FullTimeSchedule;
import foodscooter.model.users.rider.PartTimeShift;
import foodscooter.model.users.rider.RiderType;
import foodscooter.model.users.rider.SalaryInfo;
import foodscooter.model.users.rider.Rider;
import foodscooter.repositories.specifications.RidersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JdbcRidersRepository implements RidersRepository {
  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public JdbcRidersRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  //TODO
  @Override
  public List<Rider> getAll() {
    return jdbcTemplate.query(
      "SELECT drid FROM DeliveryRiders;",
      ((rs, rowNum) -> new Rider(rs.getInt(1), RiderType.FULL_TIME)));
  }

  @Override
  public boolean checkFullTime(int drid) {
    Integer fullTime = jdbcTemplate.queryForObject(
      "SELECT 1 FROM FTRiders R WHERE R.drid = ?;",
      new Object[] { drid }, ((rs, rowNum) -> new Integer(rs.getInt(1))));
    return fullTime != null;
  }

  @Override
  public boolean checkPartTime(int drid) {
    Integer partTime = jdbcTemplate.queryForObject(
      "SELECT 1 FROM PTRiders R WHERE R.drid = ?;",
      new Object[] { drid }, ((rs, rowNum) -> new Integer(rs.getInt(1))));
    return partTime != null;
  }

  @Override
  public FullTimeSchedule getFullTimeSchedule(int drid) {
    return jdbcTemplate.queryForObject(
      "SELECT dayOption, shiftOption FROM FTRiders WHERE drid = ?;",
      new Object[] { drid },
      ((rs, rowNum) -> new FullTimeSchedule(rs.getInt(1), rs.getInt(2))));
  }

  @Override
  public List<Order> getFullTimeOrders(String dayOption, String shift1, String shift2) {
    return jdbcTemplate.query(
      "SELECT * FROM Orders WHERE drid IS NULL AND EXTRACT(ISODOW FROM orderTime) IN " +
        dayOption + " AND ((orderTime::TIME " + shift1 + ") OR (orderTime::TIME " + shift2 + "));",
      ((rs, rowNum) -> new Order()));
  }

  @Override
  public List<Order> getOrderSummary(int drid) {
    return jdbcTemplate.query(
      "SELECT * FROM Orders WHERE drid = ?;",
      new Object[] { drid },
      ((rs, rowNum) -> new Order()));
  }

  @Override
  public List<Order> getAcceptedOrders(int drid) {
    return jdbcTemplate.query(
      "SELECT * FROM Orders WHERE drid = ? AND deliveryTime IS NOT NULL;",
      new Object[] { drid },
      ((rs, rowNum) -> new Order()));
  }

  @Override
  public void acceptOrder(int drid, int oid) {
    jdbcTemplate.update(
      "UPDATE Orders SET drid = ? WHERE oid = ?", new Object[]{ drid, oid});
  }

  @Override
  public void doneOrder(int drid, int oid) {
    jdbcTemplate.update(
      "UPDATE Orders SET deliveryTime = LOCALTIMESTAMP WHERE drid = ? AND oid = ?", new Object[]{drid, oid});
  }

  @Override
  public int getBaseSalary(int drid) {
    return jdbcTemplate.queryForObject(
      "SELECT salary FROM DeliveryRiders WHERE drid = ?;",
      new Object[] { drid },
      ((rs, rowNum) -> new Integer(rs.getInt(1))));
  }

  @Override
  public SalaryInfo getSummaryCurrentMonth(int drid, int baseSalary) {
    return jdbcTemplate.queryForObject(
      "SELECT COUNT(oid), SUM(deliveryFee) FROM Orders WHERE drid = ? AND MONTH(orderTime) = MONTH(CURRENT_DATE()) " +
        "AND YEAR(orderTime) = YEAR(CURRENT_DATE());",
      new Object[] { drid },
      ((rs, rowNum) -> new SalaryInfo(rs.getInt(1), rs.getInt(2) + baseSalary)));
  }

  @Override
  public SalaryInfo getSummaryCurrentWeek(int drid, int baseSalary) {
    return jdbcTemplate.queryForObject(
      "SELECT COUNT(oid), SUM(deliveryFee) FROM Orders WHERE drid = ? AND MONTH(orderTime) = MONTH(CURRENT_DATE()) " +
        "AND YEAR(orderTime) = YEAR(CURRENT_DATE()) AND EXTRACT (WEEK FROM orderTime) = EXTRACT (WEEK FROM CURRENT_DATE());",
      new Object[] { drid },
      ((rs, rowNum) -> new SalaryInfo(rs.getInt(1), rs.getInt(2) + baseSalary)));
  }

  @Override
  public List<PartTimeShift> getPartTimeShift(int drid) {
    return jdbcTemplate.query(
      "SELECT * FROM PTShifts WHERE drid = ?;",
      new Object[] { drid },
      ((rs, rowNum) -> new PartTimeShift(rs.getInt(1), rs.getInt(3),
        rs.getInt(4), rs.getInt(5))));
  }

  @Override
  public List<Order> getPartTimeOrders(int drid) {
    return jdbcTemplate.query("WITH riderPTShift AS (SELECT * FROM PTShifts WHERE drid = ?) " +
        "SELECT * FROM Orders O, riderPTShift R WHERE O.drid IS NULL " +
        "AND EXTRACT(ISODOW FROM O.orderTime) = EXTRACT(ISODOW from current_timestamp) " +
        "AND EXTRACT(ISODOW FROM O.orderTime) = R.dow AND EXTRACT(HOUR FROM O.orderTime) >= R.startHour " +
        "AND EXTRACT(ISODOW FROM O.orderTime) <= R.endHour;", new Object[] { drid },
      ((rs, rowNum) -> new Order()));
  }

    /*
  @Override
  public List<Order> getPartTimeOrders(String sqlQuery, Object[] objectArr) {
    return jdbcTemplate.query(sqlQuery, objectArr,
      ((rs, rowNum) -> new Order()));
  }

   */

}
