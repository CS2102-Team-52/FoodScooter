package foodscooter.repositories;

import foodscooter.model.Order;
import foodscooter.model.rider.FullTimeSchedule;
import foodscooter.model.rider.PartTimeShift;
import foodscooter.model.rider.RiderType;
import foodscooter.model.users.Rider;
import foodscooter.repositories.specifications.RidersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JdbcRidersRepository implements RidersRepository {
  public JdbcTemplate jdbcTemplate;

  @Autowired
  public JdbcRidersRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  //TODO
  @Override
  public void add(RiderType riderType) {

  }

  //TODO
  @Override
  public List<Rider> getAll() {
    return jdbcTemplate.query(
      "SELECT drid FROM DeliveryRiders;",
      ((rs, rowNum) -> new Rider(rs.getInt(1), null, null, RiderType.FULL_TIME)));
  }

  @Override
  public boolean checkFullTime(int drid) {
    /*
    Integer fullTime = jdbcTemplate.queryForObject(
      "SELECT 1 FROM FTRiders R WHERE R.drid = ?;",
      new Object[] { drid }, ((rs, rowNum) -> new Integer(rs.getInt(1))));
    return fullTime != null;
    */
    return true;
  }

  @Override
  public boolean checkPartTime(int drid) {
    /*
    Integer partTime = jdbcTemplate.queryForObject(
      "SELECT 1 FROM PTRiders R WHERE R.drid = ?;",
      new Object[] { drid }, ((rs, rowNum) -> new Integer(rs.getInt(1))));
    return partTime != null;
     */
    return false;
  }

  @Override
  public FullTimeSchedule getFullTimeSchedule(int drid) {
    /*
    return jdbcTemplate.queryForObject(
      "SELECT dayOption, shiftOption FROM FTRiders WHERE drid = ?;",
      new Object[] { drid },
      ((rs, rowNum) -> new FullTimeSchedule(rs.getInt(1), rs.getInt(2))));
     */
    return  null;
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
  public List<PartTimeShift> getPartTimeShift(int drid) {
    return jdbcTemplate.query(
      "SELECT * FROM PTShifts WHERE drid = ?;",
      new Object[] { drid },
      ((rs, rowNum) -> new PartTimeShift(rs.getInt(1), rs.getInt(3),
        rs.getInt(4), rs.getInt(5))));
  }

  @Override
  public List<Order> getPartTimeOrders(String sqlQuery, Object[] objectArr) {
    return jdbcTemplate.query(sqlQuery, objectArr,
      ((rs, rowNum) -> new Order()));
  }
}
