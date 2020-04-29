package foodscooter.api.controllers;

import foodscooter.model.restaurants.Restaurant;
import foodscooter.model.summaries.PromotionSummary;
import foodscooter.model.summaries.RestaurantSummary;
import foodscooter.repositories.JdbcRestaurantStaffRepository;
import foodscooter.repositories.JdbcSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestaurantStaffController extends BaseController {
  private final JdbcRestaurantStaffRepository restaurantStaffRepository;
  private final JdbcSummaryRepository summaryRepository;

  @Autowired
  public RestaurantStaffController(
    JdbcRestaurantStaffRepository restaurantStaffRepository,
    JdbcSummaryRepository summaryRepository
  ) {
    this.restaurantStaffRepository = restaurantStaffRepository;
    this.summaryRepository = summaryRepository;
  }

  @GetMapping("/staff/{staffId}/restaurant")
  public Restaurant getEmployingRestaurant(@PathVariable int staffId) {
    return restaurantStaffRepository.getEmployingRestaurant(staffId);
  }

  @GetMapping("/staff/{rid}/restaurantSummary")
  public List<RestaurantSummary> getSummaryInfoRestaurant(@PathVariable int rid) {
    return summaryRepository.getRestaurantSummary(rid);
  }

  @GetMapping("/staff/{rid}/promotionSummary")
  public List<PromotionSummary> getSummaryInfoPromotion(@PathVariable int rid) {
    return summaryRepository.getPromotionSummary(rid);
  }
}
