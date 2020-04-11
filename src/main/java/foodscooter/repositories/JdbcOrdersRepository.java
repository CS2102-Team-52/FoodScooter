package foodscooter.repositories;

import foodscooter.model.orders.CustomerOrderDetails;
import foodscooter.model.orders.Order;
import foodscooter.model.orders.PaymentType;
import foodscooter.repositories.specifications.OrdersRepository;
import foodscooter.repositories.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class JdbcOrdersRepository implements OrdersRepository {
  private final JdbcTemplate jdbcTemplate;
  private final IdGenerator idGenerator;

  @Autowired
  public JdbcOrdersRepository(
    JdbcTemplate jdbcTemplate,
    IdGenerator idGenerator) {
    this.jdbcTemplate = jdbcTemplate;
    this.idGenerator = idGenerator;
  }

  @Override
  public void add(CustomerOrderDetails customerOrderDetails) {
    int orderId = idGenerator.generate( "oid", "Orders");
    jdbcTemplate.update(
      "INSERT INTO Orders "
    + "VALUES (?)",
      orderId);

    jdbcTemplate.update(
      "UPDATE Orders "
      + "SET cid = ?,"
      + "rid = ?,"
      + "foodCost = ?,"
      + "paymentType = ?,"
      + "deliverylocation = ?, "
      + "ordertime = ? "
      + "WHERE oid = ?;",
      customerOrderDetails.getCustomerId(),
      customerOrderDetails.getRestaurantId(),
      customerOrderDetails.getTotalFoodCost(),
      customerOrderDetails.getPaymentType().toString(),
      customerOrderDetails.getLocation(),
      customerOrderDetails.getOrderTime(),
      orderId
    );
  }

  @Override
  public List<Order> getByCustomer(int customerId) {
    return jdbcTemplate.query(
      "SELECT * "
        + "FROM Orders "
        + "WHERE cid = ?",
      new Object[] { customerId },
      ((rs, rowNum) -> {
        LocalDateTime orderTime = null;
        LocalDateTime departureTime = null;
        LocalDateTime restaurantArrivalTime = null;
        LocalDateTime restaurantDepartureTime = null;
        LocalDateTime deliveryTime = null;
        if (rs.getTimestamp(10) != null) {
          orderTime = rs.getTimestamp(10).toLocalDateTime();
        }
        if (rs.getTimestamp(11) != null) {
          departureTime = rs.getTimestamp(11).toLocalDateTime();
        }
        if (rs.getTimestamp(12) != null) {
          restaurantArrivalTime = rs.getTimestamp(12).toLocalDateTime();
        }
        if (rs.getTimestamp(13) != null) {
          restaurantDepartureTime = rs.getTimestamp(13).toLocalDateTime();
        }
        if (rs.getTimestamp(14) != null) {
          deliveryTime = rs.getTimestamp(14).toLocalDateTime();
        }

        return new Order(
          rs.getInt(1),
          rs.getInt(2),
          rs.getInt(3),
          rs.getInt(4),
          rs.getFloat(5),
          rs.getFloat(6),
          rs.getInt(7),
          PaymentType.map(rs.getString(8)),
          rs.getString(9),
          orderTime,
          departureTime,
          restaurantArrivalTime,
          restaurantDepartureTime,
          deliveryTime);
      })
    );
  }

  @Override
  public void delete(int orderId) {
    jdbcTemplate.update(
      "DELETE FROM Orders "
        + "WHERE oid = ?",
      orderId
    );
  }
}
