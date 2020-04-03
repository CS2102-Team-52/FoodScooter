package foodscooter.repositories.specifications;

import foodscooter.model.Order;

import java.util.List;

public interface OrdersRepository {
  void add(Order order);
  List<Order> getByCustomer(int customerId);
  void delete(int orderId);
}
