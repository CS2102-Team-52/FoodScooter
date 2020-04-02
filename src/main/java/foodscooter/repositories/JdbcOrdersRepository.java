package foodscooter.repositories;

import foodscooter.model.Order;
import foodscooter.repositories.specifications.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JdbcOrdersRepository implements OrdersRepository {
  private JdbcTemplate jdbcTemplate;

  @Autowired
  public JdbcOrdersRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public void add(Order order) {
    jdbcTemplate.update(
      "INSERT INTO Orders "
    + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      order.getId(),
      order.getCustomerId(),
      order.getRiderId(),
      order.getTotalCost(),
      order.getDeliveryFee(),
      order.getPaymentType(),
      order.getLocation(),
      order.getOrderTime(),
      order.getDepartureTime(),
      order.getRestaurantArrivalTime(),
      order.getRestaurantDepartureTime(),
      order.getDeliveryTime());
  }

  @Override
  public List<Order> getByCustomer(int customerId) {
    System.out.println(customerId);
    List<Order> orders = jdbcTemplate.query(
      "SELECT * "
        + "FROM Orders "
        + "WHERE cid = ?",
      new Object[] { customerId },
      ((rs, rowNum) -> new Order(
        rs.getInt(1),
        rs.getInt(2),
        rs.getInt(3),
        rs.getFloat(4),
        rs.getFloat(5),
        rs.getString(6),
        rs.getString(7),
        rs.getTimestamp(8).toLocalDateTime(),
        rs.getTimestamp(9).toLocalDateTime(),
        rs.getTimestamp(10).toLocalDateTime(),
        rs.getTimestamp(11).toLocalDateTime(),
        rs.getTimestamp(12).toLocalDateTime()))
    );
    System.out.println("Size");
    System.out.println(orders.size());
    return orders;
  }

  @Override
  public void delete(int customerId, int orderId) {
    jdbcTemplate.update(
      "DELETE FROM Orders "
        + "WHERE cid = ? AND oid = ?",
      customerId, orderId
    );
  }
}
