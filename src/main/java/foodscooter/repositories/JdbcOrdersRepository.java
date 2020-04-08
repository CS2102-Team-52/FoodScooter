package foodscooter.repositories;

import foodscooter.api.dtos.orders.CustomerOrderDetails;
import foodscooter.model.Order;
import foodscooter.repositories.specifications.OrdersRepository;
import foodscooter.repositories.util.IdGenerator;
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
  public void add(CustomerOrderDetails customerOrderDetails) {
    int orderId = IdGenerator.generate(jdbcTemplate, "Orders", "oid");
    jdbcTemplate.update(
      "INSERT INTO Orders "
    + "VALUES (?)",
      orderId);

    jdbcTemplate.update(
      "UPDATE Orders "
      + "SET cid = ?,"
      + "totalCost = ?,"
      + "paymentType = ?,"
      + "location = ?, "
      + "ordertime = ? "
      + "WHERE oid = ?;",
      customerOrderDetails.getCustomerId(),
      customerOrderDetails.getTotalFoodCost(),
      customerOrderDetails.getPaymentType(),
      customerOrderDetails.getLocation(),
      customerOrderDetails.getOrderTime()
    );
  }

  @Override
  public List<Order> getByCustomer(int customerId) {
    return jdbcTemplate.query(
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
