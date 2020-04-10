package foodscooter.api.controllers;

import foodscooter.model.reviews.Review;
import foodscooter.model.restaurants.FoodItem;
import foodscooter.model.restaurants.Restaurant;
import foodscooter.repositories.JdbcFeedbackRepository;
import foodscooter.repositories.JdbcRestaurantsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestaurantController extends BaseController {
  private JdbcRestaurantsRepository restaurantsRepository;
  private JdbcFeedbackRepository feedbackRepository;

  @Autowired
  public RestaurantController(
    JdbcRestaurantsRepository restaurantsRepository,
    JdbcFeedbackRepository feedbackRepository) {
    this.restaurantsRepository = restaurantsRepository;
    this.feedbackRepository = feedbackRepository;
  }

  @GetMapping("/restaurants")
  public List<Restaurant> getAllRestaurants() {
    return restaurantsRepository.getAll();
  }

  @GetMapping("/restaurants/{restaurantId}/menu")
  public List<FoodItem> getMenu(@PathVariable int restaurantId) {
    return restaurantsRepository.getMenu(restaurantId);
  }

  @GetMapping("/restaurants/{restaurantId}/reviews")
  public List<Review> getReviews(@PathVariable int restaurantId) {
    return feedbackRepository.fetchReviews(restaurantId);
  }
}
