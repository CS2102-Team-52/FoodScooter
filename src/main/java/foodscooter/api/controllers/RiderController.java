package foodscooter.api.controllers;

import foodscooter.api.dtos.AccountDetails;
import foodscooter.model.Order;
import foodscooter.model.rider.FullTimeSchedule;
import foodscooter.model.rider.PartTimeShift;
import foodscooter.model.rider.RiderType;
import foodscooter.model.users.Rider;
import foodscooter.model.users.User;
import foodscooter.repositories.JdbcRidersRepository;
import foodscooter.repositories.JdbcUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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

  //TODO
  @GetMapping("/rider/{drid}/riderInfo")
  public Rider getRiderInfo(@PathVariable int drid) {
    User newUser = userRepository.get(drid).get();
    boolean isFullTime = riderRepository.checkFullTime(drid);
    boolean isPartTime = riderRepository.checkPartTime(drid);
    if (!(isFullTime ^ isPartTime)) {
      // return error
      return null;
    } else if (isFullTime) {
      return new Rider(newUser.getId(), RiderType.FULL_TIME);
    } else {
      return new Rider(newUser.getId(), RiderType.PART_TIME);
    }
  }

  @GetMapping("/rider/{drid}/partTimeOrders")
  public List<Order> getPartTimeRiderOrders(@PathVariable int drid) {
    List<PartTimeShift> partTimeShiftList = riderRepository.getPartTimeShift(drid);
    StringBuilder builder = new StringBuilder();
    boolean notFirst = false;
    List<Object> objectList = new ArrayList<>();
    for (PartTimeShift pts : partTimeShiftList) {
      if (notFirst) {
        builder.append("UNION ");
      }
      builder.append("SELECT * FROM Orders WHERE drid IS NULL AND EXTRACT(ISODOW FROM orderTime) = ? " +
        "AND EXTRACT(HOUR FROM orderTime) >= ? AND EXTRACT(HOUR FROM orderTime) <= ? ");
      objectList.add(pts.getDow());
      objectList.add(pts.getStartTime());
      objectList.add(pts.getEndTime());
      notFirst = true;
    }
    builder.append(";");
    Object[] objectArr = new Object[objectList.size()];
    objectList.toArray(objectArr);
    return riderRepository.getPartTimeOrders(builder.toString(), objectArr);
  }

  @GetMapping("/rider/{drid}/fullTimeOrders")
  public List<Order> getFullTimeRiderOrders(@PathVariable int drid) {
    FullTimeSchedule schedule = riderRepository.getFullTimeSchedule(drid);
    String dayStr = "";
    String shift1Str = "";
    String shift2Str = "";
    switch (schedule.getDayOption()) {
      case 1:
        dayStr = "(1, 2, 3, 4, 5)";
        break;
      case 2:
        dayStr = "(2, 3, 4, 5, 6)";
        break;
      case 3:
        dayStr = "(3, 4, 5, 6, 7)";
        break;
      case 4:
        dayStr = "(1, 4, 5, 6, 7)";
        break;
      case 5:
        dayStr = "(1, 2, 5, 6, 7)";
        break;
      case 6:
        dayStr = "(1, 2, 3, 6, 7)";
        break;
      case 7:
        dayStr = "(1, 2, 3, 4, 7)";
        break;
      default:
        dayStr = ""; // error
    }
    switch (schedule.getShiftOption()) {
      case 1:
        shift1Str = "BETWEEN TIME '10:00:00' AND '14:00:00'";
        shift2Str = "BETWEEN TIME '15:00:00' AND '19:00:00'";
        break;
      case 2:
        shift1Str = "BETWEEN TIME '11:00:00' AND '15:00:00'";
        shift2Str = "BETWEEN TIME '16:00:00' AND '20:00:00'";
        break;
      case 3:
        shift1Str = "BETWEEN TIME '12:00:00' AND '16:00:00'";
        shift2Str = "BETWEEN TIME '17:00:00' AND '21:00:00'";
        break;
      case 4:
        shift1Str = "BETWEEN TIME '13:00:00' AND '17:00:00'";
        shift2Str = "BETWEEN TIME '18:00:00' AND '20:00:00'";
        break;
      default:
    }
    return riderRepository.getFullTimeOrders(dayStr, shift1Str, shift2Str);
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
  public List<Order> acceptOrder(@PathVariable int drid, @RequestBody int oid) {
    riderRepository.acceptOrder(drid, oid);
    return riderRepository.getAcceptedOrders(drid);
  }

  @PutMapping("/rider/{drid}/doneOrder")
  public List<Order> doneOrder(@PathVariable int drid, @RequestBody int oid) {
    riderRepository.doneOrder(drid, oid);
    return riderRepository.getOrderSummary(drid);
  }
}
