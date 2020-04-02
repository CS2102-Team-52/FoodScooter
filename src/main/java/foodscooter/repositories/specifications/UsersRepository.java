package foodscooter.repositories.specifications;

import foodscooter.model.UserType;
import foodscooter.model.users.User;

import java.util.List;
import java.util.Optional;

public interface UsersRepository {
  int add(String username, String password, UserType userType);
  List<User> getAll();
  Optional<User> get(String username, String password);
}
