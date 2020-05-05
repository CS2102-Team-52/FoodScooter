package foodscooter.repositories.specifications;

import foodscooter.model.Promotion;

public interface PromotionsRepository {
  void addRestaurantPromotion(int restaurantId, Promotion promotion);
  void updateRestaurantPromotion(int restaurantId, int promotionId, Promotion promotion);
  void removeRestaurantPromotion(int restaurantId, int promotionId);
}
