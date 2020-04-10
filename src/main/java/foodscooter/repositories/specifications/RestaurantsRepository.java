package foodscooter.repositories.specifications;

import foodscooter.model.restaurants.FoodItem;
import foodscooter.model.restaurants.Restaurant;

import java.util.List;

public interface RestaurantsRepository {
  List<Restaurant> getAll();
  List<FoodItem> getMenu(int restaurantId);
  void updateAvailability(int restaurantId, int foodItemId, int delta);
}
