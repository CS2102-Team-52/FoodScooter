package foodscooter.repositories.specifications;

import foodscooter.model.orders.CustomerOrderDetails;
import foodscooter.model.orders.Order;

import java.util.List;

public interface OrdersRepository {
  void add(CustomerOrderDetails customerOrderDetails);
  List<Order> getByCustomer(int customerId);
  void delete(int orderId);
}
