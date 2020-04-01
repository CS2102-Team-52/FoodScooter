package foodscooter.repositories.specifications;

import foodscooter.model.users.Customer;

import java.util.List;

public interface CustomersRepository {
  List<Customer> getAll();
}
