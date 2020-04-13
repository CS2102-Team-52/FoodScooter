package foodscooter.api.controllers;

import foodscooter.model.summaries.CustomerSummary;
import foodscooter.model.summaries.GeneralSummary;
import foodscooter.model.summaries.LocationSummary;
import foodscooter.model.summaries.RiderSummary;
import foodscooter.repositories.JdbcSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FDSManagerController extends BaseController {
  private JdbcSummaryRepository summaryRepository;

  @Autowired
  public FDSManagerController(JdbcSummaryRepository summaryRepository) {
    this.summaryRepository = summaryRepository;
  }

  @GetMapping("/summaryInfo/general")
  public List<GeneralSummary> getSummaryInfoGeneral() {
    return summaryRepository.getGeneralSummary();
  }

  @GetMapping("/summaryInfo/customers")
  public List<CustomerSummary> getSummaryInfoCustomers() {
    return summaryRepository.getCustomerSummary();
  }

  @GetMapping("/summaryInfo/locations")
  public List<LocationSummary> getSummaryInfoLocations() {
    return summaryRepository.getLocationSummary();
  }

  @GetMapping("/summaryInfo/riders")
  public List<RiderSummary> getSummaryInfoRiders() {
    return summaryRepository.getRiderSummary();
  }
}
