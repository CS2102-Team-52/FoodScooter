package foodscooter.repositories;

import foodscooter.model.restaurants.Restaurant;
import foodscooter.repositories.specifications.RestaurantStaffRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcRestaurantStaffRepository implements RestaurantStaffRespository {
  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public JdbcRestaurantStaffRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public Restaurant getEmployingRestaurant(int staffId) {
    return jdbcTemplate.queryForObject(
      "SELECT R.* "
      + "FROM Restaurants R JOIN RestaurantStaff RS ON R.rid = RS.employedBy "
      + "WHERE RS.rsid = ?",
      new Object[] { staffId },
      (rs, rowNum) -> new Restaurant(
        rs.getInt(1),
        rs.getString(2),
        rs.getString(3),
        rs.getBigDecimal(4)
      )
    );
  }
}
