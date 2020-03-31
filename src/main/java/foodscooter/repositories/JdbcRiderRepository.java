package foodscooter.repositories;

import foodscooter.model.Rider;
import foodscooter.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JdbcRiderRepository implements RiderRepository {
  @Autowired
  public JdbcTemplate jdbcTemplate;

  @Override
  public List<Rider> getAll() {
    return jdbcTemplate.query(
      "SELECT rid FROM Riders;",
      ((rs, rowNum) -> new Rider(rs.getInt(1), null, null, true)));
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
}
