package foodscooter.api.controllers;

import foodscooter.model.Promotion;
import foodscooter.model.reviews.FoodReview;
import foodscooter.model.restaurants.FoodItem;
import foodscooter.model.restaurants.Restaurant;
import foodscooter.repositories.JdbcPromotionsRepository;
import foodscooter.repositories.JdbcReviewsRepository;
import foodscooter.repositories.JdbcRestaurantsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestaurantController extends BaseController {
  private final JdbcRestaurantsRepository restaurantsRepository;
  private final JdbcReviewsRepository feedbackRepository;
  private final JdbcPromotionsRepository promotionsRepository;

  @Autowired
  public RestaurantController(
    JdbcRestaurantsRepository restaurantsRepository,
    JdbcReviewsRepository feedbackRepository,
    JdbcPromotionsRepository promotionsRepository) {
    this.restaurantsRepository = restaurantsRepository;
    this.feedbackRepository = feedbackRepository;
    this.promotionsRepository = promotionsRepository;
  }

  @GetMapping("/restaurants/{restaurantId}")
  public Restaurant getRestaurant(@PathVariable int restaurantId) {
    return restaurantsRepository.get(restaurantId);
  }

  @GetMapping("/restaurants")
  public List<Restaurant> getAllRestaurants() {
    return restaurantsRepository.getAll();
  }

  @PatchMapping("/restaurants/{restaurantId}")
  public ResponseEntity<?> patchRestaurant(
    @PathVariable int restaurantId,
    @RequestBody Restaurant restaurant) {
    restaurantsRepository.update(restaurantId, restaurant);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/restaurants/{restaurantId}/menu")
  public List<FoodItem> getMenu(@PathVariable int restaurantId) {
    return restaurantsRepository.getMenu(restaurantId);
  }

  @PutMapping("/restaurants/{restaurantId}/menu")
  public ResponseEntity<?> addFoodItem(
    @PathVariable int restaurantId,
    @RequestBody FoodItem foodItem) {
    restaurantsRepository.addFoodItem(restaurantId, foodItem);
    return ResponseEntity.ok().build();
  }

  @PatchMapping("/restaurants/{restaurantId}/menu/{foodItemId}")
  public ResponseEntity<?> updateFoodItem(
    @PathVariable int restaurantId,
    @PathVariable int foodItemId,
    @RequestBody FoodItem foodItem) {
    restaurantsRepository.updateFoodItem(restaurantId, foodItemId, foodItem);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/restaurants/{restaurantId}/menu/batch-removal")
  public ResponseEntity<?> removeFoodItems(
    @PathVariable int restaurantId,
    @RequestBody List<Integer> foodItemIds) {
    restaurantsRepository.removeFoodItems(restaurantId, foodItemIds);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/restaurants/{restaurantId}/reviews")
  public List<FoodReview> getReviews(@PathVariable int restaurantId) {
    return feedbackRepository.getReviewsByRestaurant(restaurantId);
  }
}
