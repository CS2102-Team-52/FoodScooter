package foodscooter.repositories.specifications;

import foodscooter.model.Promotion;

import java.util.Collection;
import java.util.List;

public interface PromotionsRepository {
  Collection<Promotion> getPromotionsForRestaurant(int restaurantId);
  void addRestaurantPromotion(int restaurantId, Promotion promotion);
  void updateRestaurantPromotion(int restaurantId, int promotionId, Promotion promotion);
  void removeRestaurantPromotion(int restaurantId, List<Integer> promotionIds);
}
