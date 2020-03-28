package foodscooter.repositories;

import foodscooter.model.Rider;
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
//    jdbcTemplate.execute("INSERT INTO Users values(90000000, 'abc', 'a');");
//    jdbcTemplate.execute("INSERT INTO Customers values(90000000, 2, 3, ARRAY [4, 4]);");
    return jdbcTemplate.query(
      "SELECT cid FROM Riders;",
      ((rs, rowNum) -> new Rider(rs.getInt(1))));
  }
}
