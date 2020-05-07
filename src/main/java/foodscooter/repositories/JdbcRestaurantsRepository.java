package foodscooter.repositories;

import foodscooter.model.restaurants.FoodItem;
import foodscooter.model.restaurants.Restaurant;
import foodscooter.repositories.specifications.RestaurantsRepository;
import foodscooter.repositories.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class JdbcRestaurantsRepository implements RestaurantsRepository {
  private final JdbcTemplate jdbcTemplate;
  private final IdGenerator idGenerator;

  @Autowired
  public JdbcRestaurantsRepository(
    JdbcTemplate jdbcTemplate,
    IdGenerator idGenerator) {
    this.jdbcTemplate = jdbcTemplate;
    this.idGenerator = idGenerator;
  }

  @Override
  public Restaurant get(int restaurantId) {
    return jdbcTemplate.queryForObject(
      "SELECT * "
      + "FROM Restaurants "
      + "WHERE rid = ?;",
      new Object[] { restaurantId },
      (rs, rowNum) -> new Restaurant(
        rs.getInt(1),
        rs.getString(2),
        rs.getString(3),
        rs.getBigDecimal(4)
      )
    );
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
        rs.getBigDecimal(4))
    );
  }

  @Override
  public void update(int restaurantId, Restaurant restaurant) {
    jdbcTemplate.update(
      "UPDATE Restaurants "
      + "SET name = ?, "
      + "description = ?, "
      + "minimumPurchase = ? "
      + "WHERE rid = ?;",
      restaurant.getName(),
      restaurant.getDescription(),
      restaurant.getMinimumPurchase(),
      restaurantId
    );
  }

  @Override
  public void addFoodItem(int restaurantId, FoodItem foodItem) {
    int foodItemId = idGenerator.generate("fid", "FoodItems");
    jdbcTemplate.update(
      "INSERT INTO FoodItems "
      + "VALUES(?, ?, ?, ?, ?, ?);",
      foodItemId, restaurantId, foodItem.getName(),
      foodItem.getCategory(), foodItem.getPrice(), foodItem.getAvailability()
    );
  }

  @Override
  public void updateFoodItem(int restaurantId, int foodItemId, FoodItem foodItem) {
    jdbcTemplate.update(
      "UPDATE FoodItems "
      + "SET name = ?, "
      + "category = ?, "
      + "price = ?, "
      + "availability = ? "
      + "WHERE rid = ? AND fid = ?;",
      foodItem.getName(), foodItem.getCategory(), foodItem.getPrice(),
      foodItem.getAvailability(), restaurantId, foodItemId
    );
  }

  @Override
  public void removeFoodItems(int restaurantId, List<Integer> foodItemIds) {
    Collections.sort(foodItemIds);
    int firstFoodItemId = foodItemIds.get(0);
    int lastFoodItemId = foodItemIds.get(foodItemIds.size() - 1);
    jdbcTemplate.update(
      "DELETE FROM FoodItems "
      + "WHERE rid = ? "
      + "AND fid BETWEEN ? AND ?; ",
      restaurantId, firstFoodItemId, lastFoodItemId
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
        rs.getBigDecimal(4),
        rs.getInt(5))
    );
  }
}
