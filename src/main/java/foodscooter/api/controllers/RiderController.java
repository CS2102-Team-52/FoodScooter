package foodscooter.api.controllers;

import foodscooter.model.orders.Order;
import foodscooter.model.users.rider.RiderFullTimeSchedule;
import foodscooter.model.users.rider.RiderType;
import foodscooter.model.users.rider.SalaryInfo;
import foodscooter.model.users.rider.Rider;
import foodscooter.repositories.JdbcRidersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RiderController extends BaseController {
  private final JdbcRidersRepository riderRepository;

  @Autowired
  public RiderController(
    JdbcRidersRepository riderRepository
  ) {
    this.riderRepository = riderRepository;
  }

  @GetMapping("/riders")
  public List<Rider> getAllRiders() {
    return riderRepository.getAll();
  }

  //TODO
  @GetMapping("/rider/{drid}/riderInfo")
  public ResponseEntity<?> getRiderInfo(@PathVariable int drid) {
    boolean isFullTime = riderRepository.checkFullTime(drid);
    boolean isPartTime = riderRepository.checkPartTime(drid);
    if (!(isFullTime ^ isPartTime)) {
      // return error
      return ResponseEntity.status(409).build();
    } else if (isFullTime) {
      return ResponseEntity.ok(new Rider(drid, RiderType.FULL_TIME));
    } else {
      return ResponseEntity.ok(new Rider(drid, RiderType.PART_TIME));
    }
  }

  @GetMapping("/rider/{drid}/partTimeOrders")
  public List<Order> getPartTimeRiderOrders(@PathVariable int drid) {
    return riderRepository.getPartTimeOrders(drid);
  }

  @GetMapping("/rider/{drid}/fullTimeOrders")
  public List<Order> getFullTimeRiderOrders(@PathVariable int drid) {
    return riderRepository.getFullTimeOrders(drid);
  }

  @GetMapping("/rider/{drid}/salaryInfo")
  public SalaryInfo getRiderSalary(@PathVariable int drid) {
    int baseSalary = riderRepository.getBaseSalary(drid);
    boolean isFullTime = riderRepository.checkFullTime(drid);
    boolean isPartTime = riderRepository.checkPartTime(drid);
    if (!(isFullTime ^ isPartTime)) {
      // return error
      return null;
    } else if (isFullTime) {
      return riderRepository.getSummaryCurrentMonth(drid, baseSalary);
    } else {
      return riderRepository.getSummaryCurrentWeek(drid, baseSalary);
    }
  }

  @GetMapping("/rider/{drid}/orderSummary")
  public List<Order> getRiderSummary(@PathVariable int drid) {
    return riderRepository.getOrderSummary(drid);
  }

  @GetMapping("/rider/{drid}/acceptedOrders")
  public List<Order> getAcceptedOrders(@PathVariable int drid) {
    return riderRepository.getAcceptedOrders(drid);
  }

  @PutMapping("/rider/{drid}/acceptOrder")
  public ResponseEntity<?> acceptOrder(@PathVariable int drid, @RequestBody int oid) {
    try {
      riderRepository.acceptOrder(drid, oid);
    } catch (DataAccessException e) {
      return ResponseEntity.status(409).body(e.getMessage());
    }
    return ResponseEntity.ok(riderRepository.getAcceptedOrders(drid));
  }

  @PutMapping("/rider/{drid}/doneOrder")
  public List<Order> doneOrder(@PathVariable int drid, @RequestBody int oid) {
    riderRepository.doneOrder(drid, oid);
    return riderRepository.getOrderSummary(drid);
  }

  @GetMapping("/rider/{drid}/fullTimeSchedule")
  public RiderFullTimeSchedule getFullTimeSchedule(@PathVariable int drid) {
    return riderRepository.getRiderFullTimeSchedule(drid);
  }
}
