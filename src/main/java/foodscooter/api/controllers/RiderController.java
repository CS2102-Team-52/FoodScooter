package foodscooter.api.controllers;

import foodscooter.model.Rider;
import foodscooter.repositories.JdbcRiderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RiderController extends BaseController {
  @Autowired
  private JdbcRiderRepository repository;

  @GetMapping("/riders")
  public List<Rider> getAllRiders() {
    return repository.getAll();
  }

  @GetMapping("/riderInfo")
  public List<Rider> getRiderInfo() {
    return repository.getAll();
  }

  @GetMapping("/rider/{id}/orders")
  public List<Rider> getRiderOrders(@PathVariable Long id) {
    return repository.getAll();
  }

  @GetMapping("/rider/{id}/summary")
  public List<Rider> getRiderSummary(@PathVariable Long id) {
    return repository.getAll();
  }
}
