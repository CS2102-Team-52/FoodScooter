package foodscooter.repositories.specifications;

import foodscooter.api.dtos.orders.CustomerOrderDetails;
import foodscooter.model.Order;

import java.util.List;

public interface OrdersRepository {
  void add(CustomerOrderDetails customerOrderDetails);
  List<Order> getByCustomer(int customerId);
  void delete(int orderId);
}
