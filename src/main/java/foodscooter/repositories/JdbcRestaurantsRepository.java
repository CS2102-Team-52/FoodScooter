package foodscooter.repositories;

import foodscooter.model.restaurants.FoodItem;
import foodscooter.model.restaurants.Restaurant;
import foodscooter.repositories.specifications.RestaurantsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JdbcRestaurantsRepository implements RestaurantsRepository {
  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public JdbcRestaurantsRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public List<Restaurant> getAll() {
    return jdbcTemplate.query(
      "SELECT rid, name, description, minimumpurchase "
      + "FROM Restaurants;",
      (rs, rowNum) -> new Restaurant(
        rs.getInt(1),
        rs.getString(2),
        rs.getString(3),
        rs.getInt(4))
    );
  }

  @Override
  public List<FoodItem> getMenu(int restaurantId) {
    return jdbcTemplate.query(
      "SELECT F.fid, F.name, F.category, F.price, F.availability "
        + "FROM Restaurants R, FoodItems F "
        + "WHERE R.rid = ? AND F.rid = R.rid;",
      new Object[] { restaurantId },
      (rs, rowNum) -> new FoodItem(
        rs.getInt(1),
        rs.getString(2),
        rs.getString(3),
        rs.getFloat(4),
        rs.getInt(5))
    );
  }

  @Override
  public void updateAvailability(int restaurantId, int foodItemId, int delta) {
    jdbcTemplate.update(
      "UPDATE FoodItems "
      + "SET availability = availability + ?"
      + "WHERE rid = ? AND fid = ?",
      delta, restaurantId, foodItemId
    );
  }
}
