package foodscooter.repositories.specifications;

import foodscooter.model.orders.CustomerOrder;
import foodscooter.model.orders.Order;

import java.util.List;

public interface OrdersRepository {
  void add(CustomerOrder customerOrder);
  List<Order> getByCustomer(int customerId);
  void delete(int orderId);
}
