package foodscooter.repositories.specifications;

import foodscooter.model.restaurants.FoodItem;
import foodscooter.model.restaurants.Restaurant;

import java.util.List;

public interface RestaurantsRepository {
  Restaurant get(int restaurantId);
  List<Restaurant> getAll();
  void update(int restaurantId, Restaurant restaurant);
  void addFoodItem(int restaurantId, FoodItem foodItem);
  void updateFoodItem(int restaurantId, int foodItemId, FoodItem foodItem);
  void removeFoodItems(int restaurantId, List<Integer> foodItemIds);
  List<FoodItem> getMenu(int restaurantId);
}
