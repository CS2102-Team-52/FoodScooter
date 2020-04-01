package foodscooter.repositories.specifications;

import foodscooter.model.Order;

import java.util.List;

public interface OrdersRepository {
  void add(int customerId, Order order);
  List<Order> getByCustomer(int customerId);
  void delete(int customerId, int orderId);
}
