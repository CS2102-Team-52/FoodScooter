package foodscooter.api.controllers;

import foodscooter.model.Rider;
import foodscooter.model.User;
import foodscooter.repositories.JdbcRiderRepository;
import foodscooter.repositories.JdbcUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RiderController extends BaseController {
  @Autowired
  private JdbcRiderRepository repository;
  private JdbcUserRepository userRepository;

  @GetMapping("/riders")
  public List<Rider> getAllRiders() {
    return repository.getAll();
  }

  @PostMapping("/riderInfo")
  public Rider getRiderInfo(@RequestBody User user) {
    User newUser = userRepository.getUser(user.getUsername(), user.getPassword());
    boolean isFullTime = repository.checkFullTime(newUser.getId());
    boolean isPartTime = repository.checkPartTime(newUser.getId());
    if (isFullTime ^ isPartTime) {
      // return error
      return null;
    } else if (isFullTime) {
      return new Rider(newUser.getId(), newUser.getUsername(), newUser.getPassword(), true);
    } else {
      return new Rider(newUser.getId(), newUser.getUsername(), newUser.getPassword(), false);
    }
  }

  /*
  @GetMapping("/rider/{id}/orders")
  public List<Order> getRiderOrders(@PathVariable Long id) {
    return repository.getAll();
  }

  @GetMapping("/rider/{id}/summary")
  public List<Order> getRiderSummary(@PathVariable Long id) {
    return repository.getAll();
  }
  */
}
