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
  public List<Order> getFullTimeOrders(int drid) {
    return jdbcTemplate.query(
      "WITH dayWeek AS (SELECT CAST(EXTRACT(ISODOW from current_timestamp) AS INTEGER) AS dow), " +
        "orderDay AS (SELECT * FROM Orders O WHERE O.drid IS NULL AND EXTRACT(ISODOW FROM O.orderTime) = EXTRACT(ISODOW from current_timestamp)), " +
        "arrayIndex AS (SELECT array_position(R.dayOption, DW.dow) AS shiftIndex FROM FTRiders R, dayWeek DW WHERE R.drid = ?), " +
        "shiftInfo AS (SELECT S.fsid, S.startOneHour, S.endOneHour, S.startTwoHour, S.endTwoHour from FTShift S, FTRiders R, arrayIndex AI WHERE AI.shiftIndex IS NOT NULL AND S.fsid = R.shiftOption[AI.shiftIndex]) " +
        "SELECT * FROM orderDay OD, shiftInfo SI WHERE SI.fsid IS NOT NULL AND " +
        "((EXTRACT(HOUR FROM OD.orderTime) >= SI.startOneHour AND EXTRACT(ISODOW FROM OD.orderTime) <= SI.endOneHour) OR " +
        "(EXTRACT(HOUR FROM OD.orderTime) >= SI.startTwoHour AND EXTRACT(ISODOW FROM OD.orderTime) <= SI.endTwoHour));",
      new Object[] { drid },
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
  public List<Order> getPartTimeOrders(int drid) {
    return jdbcTemplate.query("WITH riderPTShift AS (SELECT * FROM PTShifts WHERE drid = ?) " +
        "SELECT * FROM Orders O, riderPTShift R WHERE O.drid IS NULL " +
        "AND EXTRACT(ISODOW FROM O.orderTime) = EXTRACT(ISODOW from current_timestamp) " +
        "AND EXTRACT(ISODOW FROM O.orderTime) = R.dow AND EXTRACT(HOUR FROM O.orderTime) >= R.startHour " +
        "AND EXTRACT(ISODOW FROM O.orderTime) <= R.endHour;", new Object[] { drid },
      ((rs, rowNum) -> new Order()));
  }

}
