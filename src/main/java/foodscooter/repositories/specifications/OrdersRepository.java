package foodscooter.repositories.specifications;

import foodscooter.model.orders.CustomerOrder;
import foodscooter.model.orders.Order;
import foodscooter.model.orders.OrderReviewStatus;

import java.util.List;

public interface OrdersRepository {
  void add(CustomerOrder customerOrder);
  List<Order> getByCustomer(int customerId);
  List<OrderReviewStatus> getOrderStatusesByCustomer(int customerId);
  void delete(int orderId);
}
