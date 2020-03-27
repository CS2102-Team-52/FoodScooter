package foodscooter.api.controllers;

import foodscooter.model.Customer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CustomerController extends BaseController {

  @GetMapping("/customers")
  public List<Customer> getAllCustomers() {
    Customer customer1 = new Customer(0);
    Customer customer2 = new Customer(1);
    List<Customer> customers = new ArrayList<>();
    customers.add(customer1);
    customers.add(customer2);
    return customers;
  }
}
