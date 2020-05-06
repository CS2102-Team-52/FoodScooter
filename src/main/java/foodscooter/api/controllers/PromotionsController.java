package foodscooter.api.controllers;

import foodscooter.model.Promotion;
import foodscooter.repositories.JdbcPromotionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
public class PromotionsController extends BaseController{
  private final JdbcPromotionsRepository promotionsRepository;

  @Autowired
  public PromotionsController(JdbcPromotionsRepository promotionsRepository) {
    this.promotionsRepository = promotionsRepository;
  }

  @GetMapping("/promotions/{restaurantId}")
  public Collection<Promotion> getRestaurantPromotions(
    @PathVariable int restaurantId
  ) {
    return promotionsRepository.getPromotionsForRestaurant(restaurantId);
  }

  @PostMapping("/restaurants/{restaurantId}/promotions/add")
  public ResponseEntity<?> addRestaurantPromotion(
    @PathVariable int restaurantId,
    @RequestBody Promotion promotion
  ) {
    promotionsRepository.addRestaurantPromotion(restaurantId, promotion);
    return ResponseEntity.ok().build();
  }

  @PatchMapping("/restaurants/{restaurantId}/promotions/update")
  public ResponseEntity<?> updateRestaurantPromotion(
    @PathVariable int restaurantId,
    @RequestBody Promotion promotion
  ) {
    promotionsRepository.updateRestaurantPromotion(restaurantId, promotion.getId(), promotion);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/restaurants/{restaurantId}/promotions/remove")
  public ResponseEntity<?> removeRestaurantPromotion(
    @PathVariable int restaurantId,
    @RequestBody int promotionId
  ) {
    promotionsRepository.removeRestaurantPromotion(restaurantId, promotionId);
    return ResponseEntity.ok().build();
  }
}
