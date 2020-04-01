package foodscooter.repositories;

import foodscooter.model.Order;
import foodscooter.repositories.specifications.OrdersRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JdbcOrdersRepository implements OrdersRepository {
  @Override
  public void add(int customerId, Order order) {

  }

  @Override
  public List<Order> getByCustomer(int customerId) {
    return null;
  }

  @Override
  public void delete(int customerId, int orderId) {

  }
}
