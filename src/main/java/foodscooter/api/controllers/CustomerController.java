package foodscooter.api.controllers;

import foodscooter.model.Order;
import foodscooter.repositories.JdbcOrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerController extends BaseController {
  private JdbcOrdersRepository orderRepository;

  @Autowired
  public CustomerController(
    JdbcOrdersRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  @GetMapping("/customers/{customerId}/orders")
  public List<Order> viewOrders(@PathVariable int customerId) {
    return orderRepository.getByCustomer(customerId);
  }

  @DeleteMapping("/orders/{orderId}")
  public ResponseEntity<?> deleteOrder(@PathVariable int orderId) {
    orderRepository.delete(orderId);
    return ResponseEntity.status(HttpStatus.OK).build();
  }
}
