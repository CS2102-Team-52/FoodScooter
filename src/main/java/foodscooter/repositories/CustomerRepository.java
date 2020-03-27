package foodscooter.repositories;

import foodscooter.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface CustomerRepository {
  List<Customer> getAll();
}
