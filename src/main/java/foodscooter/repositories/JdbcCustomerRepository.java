package foodscooter.repositories;

import foodscooter.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JdbcCustomerRepository implements CustomerRepository {
  @Autowired
  public JdbcTemplate jdbcTemplate;

  @Override
  public List<Customer> getAll() {
    return jdbcTemplate.queryForList("SELECT * FROM Customers", Customer.class);
  }
}
