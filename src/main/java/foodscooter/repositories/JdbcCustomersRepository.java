package foodscooter.repositories;

import foodscooter.model.orders.CustomerOrderOptions;
import foodscooter.model.users.customer.CustomerProfile;
import foodscooter.repositories.specifications.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JdbcCustomersRepository implements CustomersRepository {
  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public JdbcCustomersRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public CustomerProfile getProfile(int customerId) {
    return jdbcTemplate.queryForObject(
      "SELECT U.username, U.password, C.creditcardnumber, C.rewardpoints, C.recentdeliverylocations "
      + "FROM Customers C JOIN Users U ON C.cid = U.uid "
      + "WHERE cid = ?;",
      new Object[] { customerId },
      (((rs, rowNum) -> {
        List<String> recentDeliveryLocations = new ArrayList<>();
        Array recentDeliveryLocationsValue = rs.getArray(5);
        if (recentDeliveryLocationsValue != null) {
          recentDeliveryLocations = (List<String>) recentDeliveryLocationsValue.getArray();
        }
        return new CustomerProfile(
          rs.getString(1),
          rs.getString(2),
          rs.getString(3),
          rs.getInt(4),
          recentDeliveryLocations);
      }))
    );
  }

  @Override
  public CustomerOrderOptions getOrderOptions(int customerId) {
    return jdbcTemplate.queryForObject(
      "SELECT rewardpoints, recentDeliveryLocations "
      + "FROM Customers "
      + "WHERE cid = ?;",
      new Object[] { customerId },
      (rs, rowNum) -> {
        List<String> recentDeliveryLocations = new ArrayList<>();
        Array recentDeliveryLocationsValue = rs.getArray(2);
        if (recentDeliveryLocationsValue != null) {
          recentDeliveryLocations = (List<String>) recentDeliveryLocationsValue.getArray();
        }
        return new CustomerOrderOptions(
          rs.getInt(1),
          recentDeliveryLocations);
      });
  }

  @Override
  public void putProfile(int customerId, CustomerProfile profile) {
    jdbcTemplate.update(
      "UPDATE Users "
      + "SET username = ?,"
      + "password = ? "
      + "WHERE uid = ?;"
      + "UPDATE Customers "
      + "SET creditcardnumber = ? "
      + "WHERE cid = ?",
      profile.getUsername(),
      profile.getPassword(),
      customerId,
      profile.getCreditCardNumber(),
      customerId);
  }
}
