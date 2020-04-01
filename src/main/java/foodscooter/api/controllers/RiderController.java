package foodscooter.api.controllers;

import foodscooter.model.users.Rider;
import foodscooter.model.users.User;
import foodscooter.repositories.JdbcRidersRepository;
import foodscooter.repositories.JdbcUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RiderController extends BaseController {
  private JdbcRidersRepository riderRepository;
  private JdbcUsersRepository userRepository;

  @Autowired
  public RiderController(
    JdbcRidersRepository riderRepository,
    JdbcUsersRepository userRepository
  ) {
    this.riderRepository = riderRepository;
    this.userRepository = userRepository;
  }

  @GetMapping("/riders")
  public List<Rider> getAllRiders() {
    return riderRepository.getAll();
  }

  @PostMapping("/riderInfo")
  public Rider getRiderInfo(@RequestBody User user) {
    User newUser = userRepository.getUser(user.getUsername(), user.getPassword());
    boolean isFullTime = riderRepository.checkFullTime(newUser.getId());
    boolean isPartTime = riderRepository.checkPartTime(newUser.getId());
    if (!(isFullTime ^ isPartTime)) {
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
