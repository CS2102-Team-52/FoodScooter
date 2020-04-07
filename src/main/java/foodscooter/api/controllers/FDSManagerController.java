package foodscooter.api.controllers;

import foodscooter.model.summaries.CustomerSummary;
import foodscooter.model.summaries.LocationSummary;
import foodscooter.repositories.JdbcSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FDSManagerController extends BaseController {
  private JdbcSummaryRepository summaryRepository;

  @Autowired
  public FDSManagerController(JdbcSummaryRepository summaryRepository) {
    this.summaryRepository = summaryRepository;
  }

  // Example: .../summaryInfo/2020/05 to retrieve May 2020 summary
  @GetMapping("/summaryInfo/{year}/{month}")
  public List<Object> getSummaryInfo(@PathVariable int year, @PathVariable int month) {
    List<Object> result = new ArrayList<Object>();
    result.add(summaryRepository.getNewCustomers(year, month));
    result.add(summaryRepository.getTotalOrders(year, month));
    result.add(summaryRepository.getTotalCostAllOrders(year, month));
    return result;
  }

  @GetMapping("/summaryInfo/customers")
  public List<CustomerSummary> getSummaryInfoCustomers() {
    return summaryRepository.getCustomerSummary();
  }

  @GetMapping("/summaryInfo/locations")
  public List<LocationSummary> getSummaryInfoLocations() {
    return summaryRepository.getLocationSummary();
  }
}
