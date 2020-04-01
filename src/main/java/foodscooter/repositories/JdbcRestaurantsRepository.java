package foodscooter.repositories;

import foodscooter.model.FoodItem;
import foodscooter.model.Restaurant;
import foodscooter.repositories.specifications.RestaurantsRepository;

import java.util.List;

public class JdbcRestaurantsRepository implements RestaurantsRepository {
  @Override
  public List<Restaurant> getAll() {
    return null;
  }

  @Override
  public List<FoodItem> getFoodItems(int restaurantId) {
    return null;
  }
}
