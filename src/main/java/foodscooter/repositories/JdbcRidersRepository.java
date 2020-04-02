package foodscooter.repositories;

import foodscooter.model.RiderType;
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
      "SELECT rid FROM Riders;",
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
}
