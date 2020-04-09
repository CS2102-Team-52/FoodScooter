package foodscooter.api.controllers;

import foodscooter.api.dtos.orders.CustomerOrderDetails;
import foodscooter.model.Order;
import foodscooter.model.Feedback;
import foodscooter.repositories.JdbcFeedbackRepository;
import foodscooter.repositories.JdbcOrdersRepository;
import foodscooter.repositories.JdbcRestaurantsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerController extends BaseController {
  private JdbcOrdersRepository orderRepository;
  private JdbcRestaurantsRepository restaurantsRepository;
  private JdbcFeedbackRepository feedbackRepository;

  @Autowired
  public CustomerController(
    JdbcOrdersRepository orderRepository,
    JdbcRestaurantsRepository restaurantsRepository,
    JdbcFeedbackRepository feedbackRepository) {
    this.orderRepository = orderRepository;
    this.restaurantsRepository = restaurantsRepository;
    this.feedbackRepository = feedbackRepository;
  }

  @GetMapping("/customers/{customerId}/orders")
  public List<Order> viewOrders(@PathVariable int customerId) {
    return orderRepository.getByCustomer(customerId);
  }

  @PostMapping("/customers/{customerId}/orders")
  public ResponseEntity<?> placeOrder(
    @PathVariable int customerId,
    @RequestBody CustomerOrderDetails customerOrderDetails) {
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
  public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
    feedbackRepository.add(feedback);
    return ResponseEntity.ok().build();
  }
}
