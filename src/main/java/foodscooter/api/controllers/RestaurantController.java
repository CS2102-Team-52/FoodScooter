package foodscooter.api.controllers;

import foodscooter.model.FoodItem;
import foodscooter.model.Order;
import foodscooter.model.Restaurant;
import foodscooter.repositories.JdbcOrdersRepository;
import foodscooter.repositories.JdbcRestaurantsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestaurantController extends BaseController {
  private JdbcRestaurantsRepository restaurantsRepository;
  private JdbcOrdersRepository ordersRepository;

  @Autowired
  public RestaurantController(
    JdbcRestaurantsRepository restaurantsRepository,
    JdbcOrdersRepository ordersRepository) {
    this.restaurantsRepository = restaurantsRepository;
    this.ordersRepository = ordersRepository;
  }

  @GetMapping("/restaurants")
  public List<Restaurant> getAllRestaurants() {
    return restaurantsRepository.getAll();
  }

  @GetMapping("/restaurants/{restaurantId}/menu")
  public List<FoodItem> getMenu(@PathVariable int restaurantId) {
    return restaurantsRepository.getMenu(restaurantId);
  }

  @PostMapping("/restaurants/{restaurantId}/orders")
  public ResponseEntity<?> placeOrder(@RequestBody Order order) {
    ordersRepository.add(order);
    return ResponseEntity.status(HttpStatus.OK).build();
  }
}
