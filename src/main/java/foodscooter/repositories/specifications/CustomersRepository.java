package foodscooter.repositories.specifications;

import foodscooter.model.users.customer.CustomerProfile;

public interface CustomersRepository {
  CustomerProfile getProfile(int customerId);
  void putProfile(int customerId, CustomerProfile profile);
}
