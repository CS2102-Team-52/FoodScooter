package foodscooter.api.controllers;

import foodscooter.model.orders.CustomerOrderDetails;
import foodscooter.model.orders.Order;
import foodscooter.model.reviews.CustomerReview;
import foodscooter.model.reviews.Feedback;
import foodscooter.model.users.customer.CustomerProfile;
import foodscooter.repositories.JdbcCustomersRepository;
import foodscooter.repositories.JdbcReviewsRepository;
import foodscooter.repositories.JdbcOrdersRepository;
import foodscooter.repositories.JdbcRestaurantsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerController extends BaseController {
  private final JdbcCustomersRepository customersRepository;
  private final JdbcOrdersRepository orderRepository;
  private final JdbcRestaurantsRepository restaurantsRepository;
  private final JdbcReviewsRepository feedbackRepository;

  @Autowired
  public CustomerController(
    JdbcCustomersRepository customersRepository,
    JdbcOrdersRepository orderRepository,
    JdbcRestaurantsRepository restaurantsRepository,
    JdbcReviewsRepository feedbackRepository) {
    this.customersRepository = customersRepository;
    this.orderRepository = orderRepository;
    this.restaurantsRepository = restaurantsRepository;
    this.feedbackRepository = feedbackRepository;
  }

  @GetMapping("/customers/{customerId}")
  public CustomerProfile getProfile(@PathVariable int customerId) {
    return customersRepository.getProfile(customerId);
  }

  @PutMapping("/customers/{customerId}")
  public ResponseEntity<?> putProfile(
    @PathVariable int customerId,
    @RequestBody CustomerProfile customerProfile) {
    customersRepository.putProfile(customerId, customerProfile);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/customers/{customerId}/orders")
  public List<Order> getOrders(@PathVariable int customerId) {
    return orderRepository.getByCustomer(customerId);
  }

  @PostMapping("/orders")
  public ResponseEntity<?> postOrders(@RequestBody CustomerOrderDetails customerOrderDetails) {
    List<Integer> foodItems = customerOrderDetails.getFoodItems();
    List<Integer> quantity = customerOrderDetails.getQuantity();

    int foodItemsCount = foodItems.size();
    int restaurantId = customerOrderDetails.getRestaurantId();
    for (int i = 0; i <  foodItemsCount; i++) {
      restaurantsRepository.updateAvailability(restaurantId, foodItems.get(i), quantity.get(i));
    }

    orderRepository.add(customerOrderDetails);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/orders/{orderId}")
  public ResponseEntity<?> deleteOrder(@PathVariable int orderId) {
    orderRepository.delete(orderId);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/feedback")
  public ResponseEntity<?> postFeedback(@RequestBody Feedback feedback) {
    feedbackRepository.add(feedback);
    return ResponseEntity.ok().build();
  }

  @GetMapping("customers/{customerId}/reviews")
  public List<CustomerReview> getReviews(@PathVariable int customerId) {
    return feedbackRepository.getReviewsByCustomer(customerId);
  }
}
