package foodscooter.repositories.specifications;

import foodscooter.model.orders.CustomerOrderOptions;
import foodscooter.model.users.customer.CustomerProfile;

public interface CustomersRepository {
  CustomerProfile getProfile(int customerId);
  CustomerOrderOptions getOrderOptions(int customerId);
  void putProfile(int customerId, CustomerProfile profile);
}
