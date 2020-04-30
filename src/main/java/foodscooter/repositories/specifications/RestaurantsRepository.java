package foodscooter.repositories.specifications;

import foodscooter.model.restaurants.FoodItem;
import foodscooter.model.restaurants.Restaurant;

import java.util.List;

public interface RestaurantsRepository {
  List<Restaurant> getAll();
  void addFoodItem(int restaurantId, FoodItem foodItem);
  void updateFoodItem(int restaurantId, int foodItemId, FoodItem foodItem);
  void removeFoodItems(int restaurantId, List<Integer> foodItemIds);
  List<FoodItem> getMenu(int restaurantId);
  void updateAvailability(int restaurantId, int foodItemId, int delta);
}
