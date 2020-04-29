package foodscooter.repositories.specifications;

import foodscooter.api.dtos.login.AccountDetails;
import foodscooter.model.users.User;
import foodscooter.model.users.UserType;

import java.util.List;
import java.util.Optional;

public interface UsersRepository {
  int add(AccountDetails accountDetails);
  List<User> getAll();
  Optional<User> get(String username, String password);
  Optional<User> get(int uid);
}
