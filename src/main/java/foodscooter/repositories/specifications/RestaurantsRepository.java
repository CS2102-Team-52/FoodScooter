package foodscooter.repositories.specifications;

import foodscooter.model.FoodItem;
import foodscooter.model.Restaurant;

import java.util.List;

public interface RestaurantsRepository {
  List<Restaurant> getAll();
  List<FoodItem> getMenu(int restaurantId);
  void updateAvailability(int restaurantId, int foodItemId, int delta);
}
