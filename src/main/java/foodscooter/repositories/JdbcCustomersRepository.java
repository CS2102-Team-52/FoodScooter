package foodscooter.repositories;

import foodscooter.model.users.Customer;
import foodscooter.repositories.specifications.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class JdbcCustomersRepository implements CustomersRepository {
  public JdbcTemplate jdbcTemplate;

  @Autowired
  public JdbcCustomersRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public List<Customer> getAll() {
    return jdbcTemplate.query(
      "SELECT * FROM Customers;",
      ((rs, rowNum) -> {
        List<String> recentPlaces = rs.getObject(4, ArrayList.class);
        return new Customer(
          rs.getInt(1),
          rs.getString(2),
          rs.getInt(3),
          recentPlaces);
      }
      ));
  }
}
