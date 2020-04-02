package foodscooter.api.controllers;

import foodscooter.model.Order;
import foodscooter.repositories.JdbcCustomersRepository;
import foodscooter.repositories.JdbcOrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerController extends BaseController {
  private JdbcCustomersRepository customerRepository;
  private JdbcOrdersRepository orderRepository;

  @Autowired
  public CustomerController(
    JdbcCustomersRepository customerRepository,
    JdbcOrdersRepository orderRepository) {
    this.customerRepository = customerRepository;
    this.orderRepository = orderRepository;
  }

  @PostMapping("/customers/{customerId}/orders")
  public void placeOrder(@PathVariable int customerId, @RequestBody Order order) {
    orderRepository.add(customerId, order);
  }

  @GetMapping("/customers/{customerId}/orders")
  public List<Order> viewOrders(@PathVariable int customerId) {
    return orderRepository.getByCustomer(customerId);
  }

  @DeleteMapping("/customers/{customerId}/orders/{orderId}")
  public void deleteOrder(@PathVariable int customerId, @PathVariable int orderId) {
    orderRepository.delete(customerId, orderId);
  }
}
