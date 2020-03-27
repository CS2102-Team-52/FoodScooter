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
//    jdbcTemplate.execute("INSERT INTO Users values(90000000, 'abc', 'a');");
//    jdbcTemplate.execute("INSERT INTO Customers values(90000000, 2, 3, ARRAY [4, 4]);");
    return jdbcTemplate.query(
      "SELECT cid FROM Customers;",
      ((rs, rowNum) -> new Customer(rs.getInt(1))));
  }
}
