package foodscooter.api.controllers;

import foodscooter.model.Customer;
import foodscooter.repositories.JdbcCustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CustomerController extends BaseController {
  @Autowired
  private JdbcCustomerRepository repository;

  @GetMapping("/customers")
  public List<Customer> getAllCustomers() {
    return repository.getAll();
  }
}
